package main

import (
	"context"
	"fmt"
	client2 "github.com/dapr/go-sdk/client"
	"github.com/dapr/go-sdk/service/common"
	"net/http"
)

func eventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Printf("Subscriber received: %s", e.Data)
	return false, nil
}

func addTopicSubcription(s common.Service) {
	sub := &common.Subscription{
		PubsubName: "pubsub",
		Topic:      "newplayer",
		Route:      "/frontend",
	}
	if err := s.AddTopicEventHandler(sub, eventHandler); err != nil {
		fmt.Errorf("error adding topic subscription: %v", err)
	} else {
		fmt.Printf("subscribed to topic: %v in pubsubname %v", sub.Topic, sub.PubsubName)
	}
}

func publishPlayerToTopic(w http.ResponseWriter, r *http.Request) {
	client, err := client2.NewClient()
	// TODO: Move new dapr client into a wrapper
	if err != nil {
		panic(err)
	}

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
