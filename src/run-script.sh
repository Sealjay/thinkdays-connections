dapr run --app-id frontend --app-port 5000 --dapr-http-port 3500 --log-level debug go run server.go
 --dapr-grpc-port 60000
dapr run --app-id players-backend --app-port 5001 --dapr-http-port 3501 --log-level debug go run server.go
