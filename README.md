## Clasificador de Imágenes y Audio
1) Se debe seleccionar un problema a resolver. 
   - los seleccione ambos 
2) Compartir URL del servicio REST, debe funcionar. 
   - URL CLIENT
        - URL APP ENGINE API:  https://client-dot-falabella-test-272122.appspot.com/image
        - URL Google Kubernetes Engine(GKE) API. : http://35.230.117.216/
    - URL API
        - URL APP ENGINE API: https://falabella-test-272122.appspot.com/ 
        - URL Google Kubernetes Engine(GKE) API. : http://35.197.118.58/

    ENDPOINTS del API    
    - Para todos los endpoint /* devuelve it works     
    - Endpoint /audio POST req.files:{files:filepathtemp}        
        respons: { transcription, sentiment, entities }              
            * transcription: texto transcrito del audio              
            * sentiment: Sentimiento global del text              
            * entities: entidades presentes en el texto   
    - Endpoint /image POST req.files:{files:filepathtemp}    
        response: { objects, faces, detections: explicitContent }            
            * objects: son los objetos en la imagen            
            * feces: un arreglo con las caracteristicas de cada cada que aparece en la imagen            
            * explicitiContent: { 
                                explicitContent["adult"],    
                                explicitContent["medical"],
                                  explicitContent["spoof"],
                                  explicitContent["violence"],
                                  explicitContent["racy"]
                            }



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

gcloud config list
gcloud config set project [YOUR_PROJECT_ID]

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
kubectl create -f .\deployments\falabella-test-frontend.yml

### create deployment API kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-backend.yaml

### create deployment API kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-service-client.yaml

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

### service balancers 
kubectl get service
kubectl describe service falabella-test-api


