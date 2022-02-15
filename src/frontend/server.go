package main

import (
	"context"
	"fmt"
	dapr "github.com/dapr/go-sdk/client"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"os"
)

func addPlayer(c *fiber.Ctx) error {
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
	} else {
		fmt.Printf("Published event: %s", data)
	}
	return c.SendString("Player added.")
}

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Static("/", "./client/build")
	app.Get("/api/newplayer", addPlayer)
	app.Static("*", "./client/build/index.html")

	port := os.Getenv("PORT")
	if port == "" {
		port = ":5000"
	}

	if err := app.Listen(port); err != nil {
		panic(err)
	}
	fmt.Printf("Started running on http://127.0.0.1:%v\n", port)
}
