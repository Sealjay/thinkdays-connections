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
	fmt.Println("Starting player server on port: " + port)
	if port == ":" {
		port = ":5001"
	}

	s := daprd.NewService(port)

	if err := s.Start(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("error listening: %v", err)
	}
}
