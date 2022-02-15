#!/usr/bin/env bash
#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Chris Lloyd-Jones, AKA Sealjay, 2022. All rights reserved.
# Licensed under the MIT License.
#-------------------------------------------------------------------------------------------------------------
# Syntax: ./aca-setup.sh

# Pull in environment variables from .env file
source aca.env

# Log in, enable extensions and providers
az login
az extension add --source https://workerappscliextension.blob.core.windows.net/azure-cli-extension/containerapp-0.2.2-py2.py3-none-any.whl
az provider register --namespace Microsoft.Web

# Create a resource group and log analytics workspace
az group create --name $RESOURCE_GROUP --location $LOCATION
az monitor log-analytics workspace create --resource-group $RESOURCE_GROUP --workspace-name $LOG_ANALYTICS_WORKSPACE
LOG_ANALYTICS_WORKSPACE_CLIENT_ID=`az monitor log-analytics workspace show --query customerId -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE -o tsv | tr -d '[:space:]'`
LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET=`az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE -o tsv | tr -d '[:space:]'`

# Create a container app environment and associated storage
az containerapp env create \
  --name $CONTAINERAPPS_ENVIRONMENT \
  --resource-group $RESOURCE_GROUP \
  --logs-workspace-id $LOG_ANALYTICS_WORKSPACE_CLIENT_ID \
  --logs-workspace-key $LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET \
  --location "$LOCATION"
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location "$LOCATION" \
  --sku Standard_RAGRS \
  --kind StorageV2
STORAGE_ACCOUNT_KEY=`az storage account keys list --resource-group $RESOURCE_GROUP --account-name $STORAGE_ACCOUNT --query '[0].value' --out tsv`

# Deploy the frontend container app
REGISTRY_LOGIN_SERVER=$AZURE_REGISTRY_NAME.azurecr.io
FRONTEND_CONTAINER_IMAGE_NAME="$REGISTRY_LOGIN_SERVER/thinkdays-connections/frontend:latest"
az containerapp create \
  --name frontend \
  --resource-group $RESOURCE_GROUP \
  --image $FRONTEND_CONTAINER_IMAGE_NAME \
  --environment $CONTAINERAPPS_ENVIRONMENT \
  --registry-login-server $REGISTRY_LOGIN_SERVER \
  --registry-username $REGISTRY_USERNAME \
  --registry-password $REGISTRY_PASSWORD \
  --secrets "storage-account-name=${STORAGE_ACCOUNT},storage-account-key=${STORAGE_ACCOUNT_KEY}" \
  --target-port 5000 \
  --ingress 'external' \
  --min-replicas 1 \
  --max-replicas 1 \
  --enable-dapr \
  --dapr-app-port 3500 \
  --dapr-app-id frontend \
  --dapr-components ./components.yaml