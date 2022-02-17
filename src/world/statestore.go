package main

import (
	"context"
	"fmt"
	dapr "github.com/dapr/go-sdk/client"
)

var StateStoreName = "statestore"

func setState(key string, value string) {
	client, err := dapr.NewClient()
	// TODO: Move client into a shared context
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	data := []byte(value)
	if err := client.SaveState(ctx, StateStoreName, key, data); err != nil {
		panic(err)
	} else {
		fmt.Printf("Saved state %s: %s\n", key, value)
	}
}

func getState(key string) string {
	client, err := dapr.NewClient()
	// TODO: Move client into a shared context
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	result, err := client.GetState(ctx, StateStoreName, key)
	if err != nil {
		panic(err)
	}
	var resultString string = string(result.Value)
	fmt.Printf("Got state %s: %s\n", key, resultString)
	return resultString
}
