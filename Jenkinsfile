pipeline{
//   agent { dockerfile true }
  agent any
  environment {  
    DB_DATABASE = credentials('DB_DATABASE')
    APP_HOST = credentials('APP_HOST')
    APP_PORT = credentials('APP_PORT')
    DB_HOST = credentials('DB_HOST')
    DB_PORT = credentials('DB_PORT')
    DB_USER = credentials('DB_USER')
    DB_PWD = credentials('DB_PWD')
  }
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr:'5', daysToKeepStr: '', numToKeepStr: '5')
    disableConcurrentBuilds()
  }

  stages {
    stage('Build') {
      // when {
      //   branch 'main'
      //   branch 'develop'
      // }   
      steps {
        echo "Running build !"
        dir('back-end/') {
          sh "npm install"
          sh "npm run rebuild"
        }          
      }     
    }

    stage('Automated Testing') {
      steps {
        echo "Testing with Mocha !"
        dir('back-end/') {
          sh "npm run test:prod"
        }
      }
    }  

    stage('Push Docker Image') {
      // when {
      //   branch 'main'
      // }      
      steps {
        echo "Build Docker Image"
        sh "docker compose up -d --build"
        steps {
          script {
            docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB_LOGIN') {
              // Push the Docker image to Docker Hub
              docker.image('fresnelcool/server-app:v0').push()
            }
          } 
        }      
      }
    }

    // stage('Push Docker Image') {
    //     when {
    //         branch 'main'
    //     }
    //     steps {
    //       script {
    //         docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB_LOGIN') {
    //           // Push the Docker image to Docker Hub
    //           docker.image('fresnelcool/server-app:v0').push()
    //         }
    //       } 
    //     }
    // }

  }
}
