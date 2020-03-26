### install dependencies local
npm i
### run app local
npm start

### deploy app on gcloud
gcloud app deploy app.yml

### deploy app using kubectl
### previuos requirements 
- docker 

### install SDK gcloud 
https://cloud.google.com/sdk/install

### install kubectl
gcloud components install kubectl

### created cluster 
gcloud container clusters create bookshelf --scopes "cloud-platform" --num-nodes 2 --enable-basic-auth --issue-client-certificate --enable-ip-alias --zone us-west2

### auth configure docker
gcloud auth configure-docker

### build docker images
docker build -t gcr.io/[YOUR_PROJECT_ID]/client:v1

### push images in google container registry
gcloud docker -- push gcr.io/[YOUR_PROJECT_ID]/bookshelf

### create deployment kubectl file and implement cluster
kubectl create -f bookshelf-frontend-datastore.yaml

### show status
kubectl get deployments

### delete implementation
kubectl delete deployments bookshelf-frontend