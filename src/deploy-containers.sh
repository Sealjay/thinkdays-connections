#!/usr/bin/env bash
#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Chris Lloyd-Jones, AKA Sealjay, 2022. All rights reserved.
# Licensed under the MIT License.
#-------------------------------------------------------------------------------------------------------------
# Syntax: ./deploy-containers.sh
source acr.env

az login
cd frontend/
docker build -t thinkdays-connections/frontend:latest .
docker tag thinkdays-connections/frontend:latest $AZURE_REGISTRY_NAME.azurecr.io/thinkdays-connections/frontend:latest
docker push $AZURE_REGISTRY_NAME.azurecr.io/thinkdays-connections/frontend:latest