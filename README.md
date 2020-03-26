### install dependencies local
cd /api
npm i
### run app local
npm start

cd /client
npm i
### run app local
npm start



### install SDK gcloud 
https://cloud.google.com/sdk/install

### deploy API AND CLIENT using  ENGINE MORE EASY app API REST on gcloud
gcloud app deploy app.yml

### deploy app CLIENT using kubectl
### previuos requirements 
- docker 


### install kubectl
gcloud components install kubectl

### created cluster 
gcloud container clusters create bookshelf --scopes "cloud-platform" --num-nodes 2 --enable-basic-auth --issue-client-certificate --enable-ip-alias --zone us-west2

### auth configure docker
gcloud auth configure-docker

### build docker images CLEINTE
docker build -t gcr.io/falabella-test-272122/client:v1 .\client\
### build docker images API
docker build -t gcr.io/falabella-test-272122/api:v1 .\api\

### push images CLIENT in google container registry
gcloud docker -- push gcr.io/falabella-test-272122/client:v1
### push images API in google container registry
gcloud docker -- push gcr.io/falabella-test-272122/api:v1

### create deployment CLIENT kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-frontend.yaml

### create deployment API kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-backend.yaml

### create deployment API kubectl file and implement cluster
kubectl create -f falabella-test-service-client.yaml

### create deployment API kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-service-api.yaml

### show status
kubectl get deployments
kubectl get pods

### delete implementation
kubectl delete deployments bookshelf-frontend


### list images docker gcloud remotes
gcloud container images list
gcloud container images delete [image-name:tag]