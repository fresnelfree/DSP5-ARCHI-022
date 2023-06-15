// pipeline{
//   agent any
//   options {
//     buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr:'5', daysToKeepStr: '', numToKeepStr: '5')
//     disableConcurrentBuilds()
//   }
//   stages {
//     stage('Hello') {
//       steps {
//         echo "helloo"
//       }
//     }
//   }
// }
pipeline{
//   agent { dockerfile true }
  agent any
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr:'5', daysToKeepStr: '', numToKeepStr: '5')
    disableConcurrentBuilds()
  }
  stages {
    stage('Hello') {
      steps {
        echo "helloo World"
      }
    }
    stage('Build Docker Image') {
      steps {
        echo "Build Docker Image"
        sh "cd serveur/"
        sh "npm install"        
        sh "npm run docker:build"
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB_LOGIN') {
            // Push the Docker image to Docker Hub
            docker.image('server-app-v.0.0.1').push()
          }
        }        
        sh "npm run docker:run"        
      }
    }    
  }
}
