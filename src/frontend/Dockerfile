FROM golang:1.17.7-alpine AS backend-builder
WORKDIR /backendcompile
COPY go.mod go.sum ./
# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download
COPY . .
RUN go build -o server .

# Reinstall node dependencies only when needed
FROM node:17.5.0-alpine3.15 AS frontend-deps
WORKDIR /frontendcompile
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
COPY ./client/package*.json ./
RUN npm install --production

# Rebuild React frontend only when needed
FROM node:alpine AS frontend-builder
WORKDIR /frontendcompile
COPY ./client/ .
COPY --from=frontend-deps /frontendcompile/node_modules ./node_modules
RUN npm run build
RUN npm run test --if-present

# Last stage: discard everything except our executables.
FROM alpine:latest AS prod
WORKDIR /build
RUN mkdir -p /client/build
# Copy our executable and our built React application.
COPY --from=backend-builder /backendcompile/server .
COPY --from=frontend-builder /frontendcompile/build ./client/build

# Declare entrypoints and activation commands.
EXPOSE 5000
ENTRYPOINT ["./server"]