// Initialize a LinkedHashMap / object to share between stages
def pipelineContext = [:]

pipeline {
    agent any

    environment {
        DOCKER_IMAGE_TAG = "movie-api:build-${env.BUILD_ID}"
    }

    stages {
        stage('Configure') {
            steps {
                echo 'Create parameters file'
            }
        }
        stage('Build') {
            steps {
                echo "Build docker image"
                script {
                    dockerImage = docker.build("${env.DOCKER_IMAGE_TAG}",  '-f ./Dockerfile .')
                    pipelineContext.dockerImage = dockerImage
                }
            }
        }
        stage('Run') {
            steps {
                echo "Run docker image"
                script {
                    pipelineContext.dockerContainer = pipelineContext.dockerImage.run()
                }
            }
        }
        stage('Test') {
            steps {
                echo "Testing the app"
            }
        }
        stage('Push') {
            steps {
                echo "Pushing the Docker image to the registry"
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying the Docker image"
            }
        }
    }
    post {
        always {
            echo "Stop Docker image"
            script {
                if (pipelineContext && pipelineContext.dockerContainer) {
                    pipelineContext.dockerContainer.stop()
                }
            }
        }
    }
}