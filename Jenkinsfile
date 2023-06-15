pipeline{
//   agent { dockerfile true }
  agent any
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr:'5', daysToKeepStr: '', numToKeepStr: '5')
    disableConcurrentBuilds()
  }
  stages {
    stage('Build') {
      steps {
        echo "Running build automation"
      }
    }
    stage('Automated Testing') {
      steps {
        echo "Automated Testing"
      }
    }    
    stage('Build Docker Image') {
      when {
          branch 'main'
      }      
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
        sh "docker run -p 3000:3000 -d fresnelcool/server-app-v.0.0.1"        
      }
    }    
  }
}
