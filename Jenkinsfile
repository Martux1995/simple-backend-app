pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('DockerHub')
    }
    
    stages {
        stage('prebuild') {
            steps { sh 'npm install' }
        }
        stage('testing') {
            steps { sh 'npm run test' }
        }
        stage('build') {
            steps { 
                sh 'docker build -t martux1995/simple-backend-app:latest .'
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                sh('docker login -u $DOCKERHUB_CREDS_USR -p $DOCKERHUB_CREDS_PSW')
                sh 'docker push martux1995/simple-backend-app:latest'
            }
        }

        stage('Clean') {
            steps {
                sh 'docker rmi martux1995/simple-backend-app:latest'
            }
        }

        stage('Deploy in Minikube') {
            steps {
                withCredentials(bindings: [
                    string(credencialsId: 'Minikube_Service_Token', variable: 'api_token')
                ]) {
                    sh 'kubectl --token $api_token apply -f kube/deploy.prod.yaml'
                }
            }
        }
    }
}
