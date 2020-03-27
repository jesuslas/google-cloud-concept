## Clasificador de Imágenes y Audio
- Se carga una imagen, la envia al api y este retorna la información de la imagen. 
- Se carga un audio, la envia al api y este retorna la información del audio. 
   
- Compartir URL del servicio REST, que funcionan. 
- URL CLIENT
    - URL APP ENGINE API:  https://client-dot-falabella-test-272122.appspot.com/image
    - URL Google Kubernetes Engine(GKE) API. : http://35.230.117.216/
- URL API
    - URL APP ENGINE API: https://falabella-test-272122.appspot.com/ 
    - URL Google Kubernetes Engine(GKE) API. : http://35.197.118.58/

ENDPOINTS del API    
- Para todos los endpoint /* devuelve "it works"     
- Endpoint /audio POST req.files:{files:filepathtemp}        
    - respons: { transcription, sentiment, entities }              
        * transcription: texto transcrito del audio              
        * sentiment: Sentimiento global del text              
        * entities: entidades presentes en el texto   

- Endpoint /image POST req.files: { files: filepathtemp }
    - response: { objects, faces, detections: explicitContent }      
        * objects: son los objetos en la imagen            
        * feces: un arreglo con las caracteristicas de cada cada que aparece en la imagen            
        * explicitiContent: { 
                            explicitContent["adult"],    
                            explicitContent["medical"],
                            explicitContent["spoof"],
                            explicitContent["violence"],
                            explicitContent["racy"]
                        }

- Herramientas Utilizadas:
    - Backend:
        - Nodejs
        - Expressjs ( api rest )
        - mocha (pruebas funcionales)
        - eslint (para el estandard del código)
    
    - Frontend:
        - Reactjs
        - eslint
        - router
        - hooks

- Herramientas de GOOGLE CLOUD
    - Google Kubernetes Engine(GKE).
    - Google App Engine.


- APIS de GOOGLE CLOUD UTILIZADAS    
    - @google-cloud/storage 
    - @google-cloud/vision
    - @google-cloud/speech
    - @google-cloud/language

- Suposiciones imagenes:
    - Se requiere contabilizar la cantidad de personas que hay en una imagen
    - Se requiere examinar si una imagen tiene contenido para adultos, violencia (entre otros) 
    - Se requiere examinar cuales objectos hay en una imagen 
- Suposiciones audio:
    - Se requiere transcribir un audio
    - Se requiere examinar las entidades que hay en un texto 
    - Se requiere examinar cuales sentimientos hay en un texto 



### install dependencies local
cd /api
npm i
### run app local
npm start

cd /client
npm i
### run app local
npm start


### set json config file to autenticate local gcloud APIS
set GOOGLE_APPLICATION_CREDENTIALS=[PATH]

### autenticate gcloud 
gcloud auth application-default login

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
### push images CLIENT in google container registry
gcloud docker -- push gcr.io/falabella-test-272122/client:v1
### create deployment CLIENT kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-frontend.yml
### create deployment API kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-service-client.yaml

### build docker images API
docker build -t gcr.io/falabella-test-272122/api:v1 .\api\
### push images API in google container registry
gcloud docker -- push gcr.io/falabella-test-272122/api:v1
### create deployment API kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-backend.yaml
### create deployment API kubectl file and implement cluster
kubectl create -f .\deployments\falabella-test-service-api.yaml

docker run --name elapi -e GOOGLE_APPLICATION_CREDENTIALS=/api/images/falabella-test-be7ccbe05e54.json -p 8000:8000 gcr.io/falabella-test-272122/api:v1

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


