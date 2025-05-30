pipeline {
    agent any

    environment {
        dockerImage = ''
    }
    
    stages {
        stage('Run Tests') {
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }
        stage('build') {
            steps { 
                script {
                    dockerImage = docker.build('martux1995/simple-backend-app:latest')
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHub') {
                        dockerImage.push()
                    }
                }
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
                    string(credentialsId: 'Minikube_Service_Token', variable: 'api_token')
                ]) {
                    sh 'kubectl --token $api_token apply --server https://192.168.49.2:8443 --insecure-skip-tls-verify=true -f kube/deploy.prod.yaml'
                }
            }
        }
    }
}
