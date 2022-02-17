package main

import (
	"fmt"
	daprd "github.com/dapr/go-sdk/service/http"
	"log"
	"net/http"
	"os"
)

func main() {
	port := ":" + os.Getenv("APP_PORT")
	fmt.Println("Starting world server on port: " + port)
	if port == ":" {
		port = ":5003"
	}

	s := daprd.NewService(port)
	subscribeTopic(s, "pubsub", "serverstart", "/serverstart", serverInitEventHandler)
	subscribeTopic(s, "pubsub", "newconnection", "/newconnection", newConnectionEventHandler)
	if err := s.Start(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("error listening: %v", err)
	}
}
