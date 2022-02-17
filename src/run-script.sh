#!/usr/bin/env bash
#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Chris Lloyd-Jones, AKA Sealjay, 2022. All rights reserved.
# Licensed under the MIT License.
#-------------------------------------------------------------------------------------------------------------
# Syntax: ./run-script.sh

frontend(){
  cd frontend
  dapr run --app-id frontend --app-port 5000 --dapr-http-port 3500 --log-level debug go run *.go
}

players() {
  cd players
  dapr run --app-id players-backend --app-port 5001 --dapr-http-port 3501 --log-level debug go run *.go
}

world() {
  cd world
  dapr run --app-id world-backend --app-port 5002 --dapr-http-port 3502 --log-level debug go run *.go
}

feed() {
  cd feed
  dapr run --app-id feed-backend --app-port 5003 --dapr-http-port 3503 --log-level debug go run *.go
}

# Ask which function to run
echo "Which function would you like to run?"
echo "1. frontend"
echo "2. backend - players"
echo "3. backend - world"
echo "4. backend - feed"
read -p "Enter your choice: " choice

# run function
case $choice in
  1) frontend ;;
  2) players ;;
  3) world ;;
  4) feed ;;
  *) echo "Invalid choice" ;;

  esac

# -dapr-grpc-port 60000
