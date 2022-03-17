package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

type Hub struct {
	clients   map[*websocket.Conn]bool
	broadcast chan Message
}

type Message struct {
	Type    string `json:"type"`
	Message string `json:"message"`
}

var upgrade = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func NewHub() *Hub {
	return &Hub{
		clients:   make(map[*websocket.Conn]bool),
		broadcast: make(chan Message),
	}
}

func (h *Hub) run() {
	for {
		select {
		case message := <-h.broadcast:
			for client := range h.clients {
				if err := client.WriteJSON(message); err != nil {
					fmt.Printf("error occurred: %v", err)
				}
			}
		}
	}
}

func socketHandler(hub *Hub) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		upgrade.CheckOrigin = func(r *http.Request) bool { return true }

		conn, err := upgrade.Upgrade(w, r, nil)

		if err != nil {
			fmt.Errorf("Error during connection upgrade: %v\n", err)
			return
		}
		defer func() {
			delete(hub.clients, conn)
			defer conn.Close()
			fmt.Println("Closed!")
		}()

		hub.clients[conn] = true
		fmt.Println("Connected!")
		publishToTopic("pubsub", "newconnection", conn.RemoteAddr().String())
		read(hub, conn)
	}
}

func read(hub *Hub, client *websocket.Conn) {
	for {
		var message Message
		if err := client.ReadJSON(&message); err != nil {
			fmt.Errorf("error occurred: %v\n", err)
			delete(hub.clients, client)
			break
		}
		fmt.Printf("Received message: %v\n", message.Message)
		switch message.Type {
		case "SEND_MESSAGE":
			message.Type = "SET_DEMO_MESSAGE"
			fmt.Printf("Message received and rebroadcast: %v\n", message.Message)
			hub.broadcast <- message
		case "SET_SCENE":
			fmt.Printf("Scene received and rebroadcast: %v\n", message.Message)
			hub.broadcast <- message
		case "SET_SCRIPT":
			fmt.Printf("Scene received and rebroadcast: %v\n", message.Message)
			hub.broadcast <- message
		case "SET_HEADER":
			fmt.Printf("Header received and rebroadcast: %v\n", message.Message)
			hub.broadcast <- message
		case "ADD_FEED":
			fmt.Printf("Feed received and rebroadcast: %v\n", message.Message)
			hub.broadcast <- message
		default:
			fmt.Printf("Unknown action: %v\n", message.Type)
		}
	}
}

func broadcastMessage(action string, message interface{}) {
	var publishMessage Message
	publishMessage.Type = action
	publishMessage.Message = fmt.Sprint(message)
	websocketHub.broadcast <- publishMessage
	fmt.Printf("Type (%v): %v\n", action, publishMessage.Message)
}
