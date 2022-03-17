## Setting up the application to run in Azure Container Apps
### Scripts
You can use the local bash scripts provided, including `./src/deploy-containers.sh` to push the containers to your private Azure Container Registry, `./src/aca-setup.sh` to set up the Azure Container App, and `./src/cleanup.sh` to clean up resources.

Make sure the files are executable, by navigating to src with `cd src` and changing permissions with `chmod 755 deploy-containers.sh aca-setup.sh cleanup.sh`.

Open `./src/aca.example.env`, replace the placeholder variables in with your own values, and save the file as `./src/aca.env`, and update the containerName value in `src/components.yaml` from `concontainer` to the container name you chose.

### Publishing the container images to your private Azure Container Registry
In an ideal world, you'd be able to publish the container images to your private Azure Container Registry as part of your CI/CD pipeline.

Here, we'll manually push the docker images.
1. Log in to Azure with `az login`.
2. Set the parameters for the registry.
```bash
AZURE_REGISTRY_NAME=<REGISTRY_NAME>
```
3. Log in to your registry with `az acr login --name $AZURE_REGISTRY_NAME`.
4. Navigate to `src/frontend/`.
5. Run `docker build -t thinkdays-connections/frontend:latest .`,
6. Tag the image with `docker tag thinkdays-connections/frontend:latest $AZURE_REGISTRY_NAME.azurecr.io/thinkdays-connections/frontend:latest`.
7. Push the images to your registry with `docker push $AZURE_REGISTRY_NAME.azurecr.io/thinkdays-connections/frontend:latest`.

### Deploying the application to Azure Container Apps
1. Log in to Azure with `az login`.
2. Install the Azure Container Apps extension for the CLI with `az extension add --source https://workerappscliextension.blob.core.windows.net/azure-cli-extension/containerapp-0.2.2-py2.py3-none-any.whl`.
3. Register the Microsoft.Web namespace with `az provider register --namespace Microsoft.Web`.
4. Set required environmental variables.
```bash
RESOURCE_GROUP="OpenTech_ThinkDays_Connections"
LOCATION="westeurope"
LOG_ANALYTICS_WORKSPACE="ot-thinkdays-ws"
CONTAINERAPPS_ENVIRONMENT="ot-thinkdays-env"
```
5. Create a resource group with `az group create --name $RESOURCE_GROUP --location $LOCATION`.
6. Create a log analytics workspace with `az monitor log-analytics workspace create --resource-group $RESOURCE_GROUP --workspace-name $LOG_ANALYTICS_WORKSPACE`.
7. Retrieve the log analytics client ID and client secret.
```bash
LOG_ANALYTICS_WORKSPACE_CLIENT_ID=`az monitor log-analytics workspace show --query customerId -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE -o tsv | tr -d '[:space:]'`
LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET=`az monitor log-analytics workspace get-shared-keys --query primarySharedKey -g $RESOURCE_GROUP -n $LOG_ANALYTICS_WORKSPACE -o tsv | tr -d '[:space:]'`
```
7. Create a container app environment.
```bash
az containerapp env create \
  --name $CONTAINERAPPS_ENVIRONMENT \
  --resource-group $RESOURCE_GROUP \
  --logs-workspace-id $LOG_ANALYTICS_WORKSPACE_CLIENT_ID \
  --logs-workspace-key $LOG_ANALYTICS_WORKSPACE_CLIENT_SECRET \
  --location "$LOCATION" 
```
8. Set variables for storage account.
```bash
STORAGE_ACCOUNT="otthinkdays"
STORAGE_ACCOUNT_CONTAINER="concontainer"
```
9. Create a storage account.
```bash
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location "$LOCATION" \
  --sku Standard_RAGRS \
  --kind StorageV2
```
10. Get the storage account key.
```bash
STORAGE_ACCOUNT_KEY=`az storage account keys list --resource-group $RESOURCE_GROUP --account-name $STORAGE_ACCOUNT --query '[0].value' --out tsv`
```
11. Update the containerName value in `src/components.yaml` from `concontainer` to the container name you chose.
12. Navigate to the `src` directory.
13. Set the parameters for the container app image, swapping in your own parameters.
```bash
REGISTRY_LOGIN_SERVER=$AZURE_REGISTRY_NAME.azurecr.io
FRONTEND_CONTAINER_IMAGE_NAME="$REGISTRY_LOGIN_SERVER/thinkdays-connections/frontend:latest"
REGISTRY_USERNAME=<REGISTRY_USERNAME>
REGISTRY_PASSWORD=<REGISTRY_PASSWORD> 
```
14. Deploy the container app.
```bash
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
```
### Clean up the resources
1. Delete the resource group with `az group delete --name $RESOURCE_GROUP`
2. Optionally, delete the container with `az acr repository delete --name $AZURE_REGISTRY_NAME --image thinkdays-connections/frontend:latest`
