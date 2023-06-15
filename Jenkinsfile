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
        dir('serveur/') {
          sh "ls -l"        
//           sh "npm run docker:build"
          sh "docker build -t fresnelcool/server-app-v.0.0.1 ."
        }  
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB_LOGIN') {
            // Push the Docker image to Docker Hub
            docker.image('fresnelcool/server-app-v.0.0.1').push()
          }
        }        
        sh "npm run docker:run"        
      }
    }    
  }
}
