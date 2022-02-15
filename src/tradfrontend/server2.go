package main

import (
	"context"
	"fmt"
	dapr "github.com/dapr/go-sdk/client"
	"net/http"
)

func addPlayer(w http.ResponseWriter, r *http.Request) {
	client, err := dapr.NewClient()
	if err != nil {
		panic(err)
	}
	//defer client.Close()
	ctx := context.Background()
	var (
		pubsubName = "pubsub"
		topicName  = "newplayer"
	)
	data := []byte("ping")

	if err := client.PublishEvent(ctx, pubsubName, topicName, data); err != nil {
		fmt.Printf("Failed to publish event: %v", err)
	}
	fmt.Println("data published")
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message":"ok"}`))
}

func main() {
	http.HandleFunc("/", addPlayer)
	fmt.Print("Started running on http://127.0.0.1:8000\n")
	fmt.Println(http.ListenAndServe(":8000", nil))
}
