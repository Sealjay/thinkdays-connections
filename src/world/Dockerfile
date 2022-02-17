FROM golang:1.17.7-alpine AS backend-builder
WORKDIR /servercompile
COPY go.mod go.sum ./
# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download
COPY . .
RUN go build -o server .

# Declare entrypoints and activation commands.
EXPOSE 5000
ENTRYPOINT ["./server"]