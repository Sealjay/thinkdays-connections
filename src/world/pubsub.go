package main

import (
	"context"
	"fmt"
	dapr "github.com/dapr/go-sdk/client"
	"github.com/dapr/go-sdk/service/common"
	"log"
)

func debugEventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Printf("Debug received: %s\n", e.Data)
	return false, nil
}

func subscribeTopic(daprClient common.Service, pubsubName string, topic string, route string, eventHandler common.TopicEventHandler) {
	sub := &common.Subscription{
		PubsubName: pubsubName,
		Topic:      topic,
		Route:      route,
	}
	if err := daprClient.AddTopicEventHandler(sub, eventHandler); err != nil {
		log.Fatalf("error adding topic subscription: %v", err)
	} else {
		log.Printf("subscribed to topic: %v in pubsubname %v", sub.Topic, sub.PubsubName)
	}
}

func publishToTopic(pubSubName string, topicName string, dataString string) {
	client, err := dapr.NewClient()
	if err != nil {
		panic(err)
	}

	ctx := context.Background()
	if err := client.PublishEvent(ctx, pubSubName, topicName, dataString); err != nil {
		fmt.Printf("Failed to publish event: %v", err)
	}
	fmt.Printf("%v - %v: %v\n", pubSubName, topicName, dataString)
}
