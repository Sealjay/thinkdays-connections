# Start Here
This repository has the following structure:
- `docs`: contains the documentation
- `literature-review`: contains the literature review
- `src`: contains the source code

## Related documentation
- [Literature Review](../literature-review/review.md) - A brief overview of the literature review.
- [Deploying in Azure](./deploying-in-azure.md) - A quite detailed step by step walkthrough of how to deploy the application in Azure.
- [Architecture](./architecture.md) - Just a bulleted list of components at the moment.

## Requirements
This application is built using DAPR v1.6.0. To run this locally, you will need:
- Docker
- Dapr CLI
- Go v17+
- Node.js 1.17+

# Setting up the application to run locally
## Step by Step
1. Begin [DAPR (Distributed Application Runtime)](https://docs.microsoft.com/en-gb/azure/container-apps/microservices-dapr?WT.mc_id=AI-MVP-5004204) with `dapr init`
2. Go Application to serve React frontend
- Open the `src/frontend/client` directory
- Install the application with `npm install`
- Build the application with `npm run build`
- Open the `src/frontend` directory
- Run the application with `dapr run --app-id frontend --app-port 5000 --dapr-http-port 3500 --dapr-grpc-port 60000 --components-path ../config go run server.go`
3. Go Application to handle player events
- Open the `src/players` directory
- Run the application with `dapr run --app-id players-backend --app-port 5001 --dapr-http-port 3501 --components-path ../config go run server.go`

## Scripts
You can use the local bash scripts provided, including `./src/run-script.sh` to start each service individually.

Make sure the files are executable, by navigating to src with `cd src` and changing permissions with `chmod 755 run-script.sh`.
