package main

import (
	"fmt"
	daprd "github.com/dapr/go-sdk/service/http"
	"github.com/gorilla/mux"
	"net/http"
	"os"
)

func main() {
	port := ":" + os.Getenv("APP_PORT")
	if port == ":" {
		port = ":5000"
	}
	fmt.Println("Starting server on port: " + port)

	muxRouter := mux.NewRouter()
	muxRouter.HandleFunc("/api/newplayer", publishPlayerToTopic)

	addFileHandlers(muxRouter)

	websocketHub := NewHub()
	go websocketHub.run()
	muxRouter.HandleFunc("/ws", socketHandler(websocketHub))

	s := daprd.NewServiceWithMux(port, muxRouter)
	addTopicSubcription(s)

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
