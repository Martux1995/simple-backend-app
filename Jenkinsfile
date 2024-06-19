pipeline {
    agent any

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
                withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]) {
                sh "echo ${env.dockerHubPass} | docker login -u ${env.dockerHubUser} --password-stdin"
                sh 'docker push martux1995/simple-backend-app:latest'
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
                    string(credencialsId: 'Minikube_Service_Token', variable: 'api_token')
                ]) {
                    sh "kubectl --token $api_token apply -f kube/deploy.prod.yaml"
                }
            }
        }
    }
}
