package main

import (
	"context"
	"github.com/dapr/go-sdk/service/common"
	daprd "github.com/dapr/go-sdk/service/http"
	"log"
	"net/http"
)

var sub = &common.Subscription{
	PubsubName: "pubsub",
	Topic:      "newplayer",
	Route:      "/players-backend",
}

func main() {
	s := daprd.NewService(":5002")
	//Subscribe to a topic
	if err := s.AddTopicEventHandler(sub, eventHandler); err != nil {
		log.Fatalf("error adding topic subscription: %v", err)
	} else {
		log.Printf("subscribed to topic: %v in pubsubname %v", sub.Topic, sub.PubsubName)
	}
	if err := s.Start(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("error listening: %v", err)
	}
}

func eventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	log.Printf("Subscriber received: %s", e.Data)
	return false, nil
}
