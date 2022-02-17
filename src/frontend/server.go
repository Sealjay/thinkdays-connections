package main

import (
	"context"
	"fmt"
	"github.com/dapr/go-sdk/service/common"
	daprd "github.com/dapr/go-sdk/service/http"
	"github.com/gorilla/mux"
	"net/http"
	"os"
)

var websocketHub *Hub

func main() {
	port := ":" + os.Getenv("APP_PORT")
	if port == ":" {
		port = ":5000"
	}
	fmt.Println("Starting server on port: " + port)

	muxRouter := mux.NewRouter()
	muxRouter.HandleFunc("/api/newplayer", publishPlayerToTopic)

	addFileHandlers(muxRouter)

	websocketHub = NewHub()
	go websocketHub.run()
	muxRouter.HandleFunc("/ws", socketHandler(websocketHub))

	s := daprd.NewServiceWithMux(port, muxRouter)
	publishToTopic("pubsub", "serverstart", "initializing")
	subscribeTopic(s, "pubsub", "worldstate-header", "/worldstate-header", headerEventHandler)

	if err := s.Start(); err != nil && err != http.ErrServerClosed {
		fmt.Errorf("error: %v", err)
	}
}

func addFileHandlers(mux *mux.Router) {
	fs := http.FileServer(http.Dir("./client/build"))
	localFileList := []string{"logo192.png",
		"logo512.png",
		"manifest.json",
		"favicon.ico",
		"index.html",
		"robots.txt",
		"sitemap.txt",
		"",
	}
	for _, localFile := range localFileList {
		mux.Handle("/"+localFile, fs)
	}
	mux.PathPrefix("/static").Handler(http.StripPrefix("/", fs))
}

func publishPlayerToTopic(w http.ResponseWriter, r *http.Request) {
	publishToTopic("pubsub", "player-created", "ping")
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message":"ok"}`))
}

func headerEventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	fmt.Printf("Header event received: %s", e.Data)
	broadcastMessage("setHeader", e.Data)
	return false, nil
}
