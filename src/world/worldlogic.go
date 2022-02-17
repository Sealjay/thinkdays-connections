package main

import (
	"context"
	"fmt"
	"github.com/dapr/go-sdk/service/common"
)

func serverInitEventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Printf("Server init: %s\n", e.Data)
	setState("header", "Who killed fun?")
	return false, nil
}

func newConnectionEventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Printf("New connection: %s\n", e.Data)
	var header = getState("header")
	publishToTopic("pubsub", "worldstate-header", header)
	return false, nil
}
