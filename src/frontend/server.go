package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"os"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Static("/", "./client/build")
	app.Static("*", "./client/build/index.html")

	port := os.Getenv("PORT")
	if port == "" {
		port = ":5000"
	}

	if err := app.Listen(port); err != nil {
		panic(err)
	}
	fmt.Print("Started running on http://127.0.0.1:5000\n")
}

/*
	// TODO: Add state store processing
	// TODO: Add persist for dapr
*/
