pipeline {
    agent { dockerfile true }

    stages {
        stage('prebuild') {
            steps { sh 'npm install' }
        }
        stage('testing') {
            steps { sh 'npm run test' }
        }
        stage('build') {
            steps { sh 'npm run build' }
        }

        stage('Push Image to DockerHub') {
            steps { 
                def image = docker.build('martux1995/simple-backend-app:latest')
                image.push()
            }
        }

        stage('Deploy in Minikube') {
            steps {
                withCredentials(bindings: [
                    string(credencialsId: 'kubernetes-jenkins-server-account', variable: 'api_token')
                ]) {
                    sh 'kubectl --token $api_token apply -f kube/deploy.prod.yaml'
                }
            }
        }
    }
}