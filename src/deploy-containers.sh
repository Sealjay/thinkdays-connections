#!/usr/bin/env bash
#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Chris Lloyd-Jones, AKA Sealjay, 2022. All rights reserved.
# Licensed under the MIT License.
#-------------------------------------------------------------------------------------------------------------
# Syntax: ./deploy-containers.sh

# Pull in environment variables from .env file
source aca.env

# Log in to Azure
az login

cd frontend/

# Build, tag, and push the frontend container
docker build -t thinkdays-connections/frontend:latest .
docker tag thinkdays-connections/frontend:latest $AZURE_REGISTRY_NAME.azurecr.io/thinkdays-connections/frontend:latest
docker push $AZURE_REGISTRY_NAME.azurecr.io/thinkdays-connections/frontend:latest