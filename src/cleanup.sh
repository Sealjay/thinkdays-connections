#!/usr/bin/env bash
#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Chris Lloyd-Jones, AKA Sealjay, 2022. All rights reserved.
# Licensed under the MIT License.
#-------------------------------------------------------------------------------------------------------------
# Syntax: ./cleanup.sh

# Pull in environment variables from .env file
source aca.env

# Login and delete resources
az login
az group delete --name $RESOURCE_GROUP --no-wait --yes
az acr repository delete --name $AZURE_REGISTRY_NAME --image thinkdays-connections/frontend:latest --yes
