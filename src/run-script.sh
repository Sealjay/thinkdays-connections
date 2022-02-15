#!/usr/bin/env bash
#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Chris Lloyd-Jones, AKA Sealjay, 2022. All rights reserved.
# Licensed under the MIT License.
#-------------------------------------------------------------------------------------------------------------
# Syntax: ./run-script.sh

frontend(){
  cd frontend
  dapr run --app-id frontend --app-port 5000 --dapr-http-port 3500 --log-level debug go run server.go
}

backend() {
  cd players
  dapr run --app-id players-backend --app-port 5001 --dapr-http-port 3501 --log-level debug go run players.go
}

# Ask which function to run
echo "Which function would you like to run?"
echo "1. frontend"
echo "2. backend"
read -p "Enter your choice: " choice

# run function
case $choice in
  1) frontend ;;
  2) backend ;;
  *) echo "Invalid choice" ;;

  esac

# -dapr-grpc-port 60000
