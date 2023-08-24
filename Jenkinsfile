pipeline{
//   agent { dockerfile true }
  agent any

  tools{
    nodejs 'node'
  }

  environment {  
    // DB_DATABASE = credentials('DB_DATABASE')
    // APP_HOST = credentials('APP_HOST')
    // APP_PORT = credentials('APP_PORT')
    // DB_HOST = credentials('DB_HOST')
    // DB_PORT = credentials('DB_PORT')
    // DB_USER = credentials('DB_USER')
    // DB_PWD = credentials('DB_PWD')

    DB_HOST = "127.0.0.1"
    DB_PORT = 3306
    DB_USER = 'root'
    APP_PORT = 3000
    APP_HOST = 'localhost'
    DB_PWD = 'Dsp-archi-15'
    DB_DATABASE = 'DSP5-ARCHI-DB'
    DOCKER_HUB_LOGIN = credentials('DOCKER_HUB_LOGIN')
    // DOCKER_HOST = "/var/run/docker.sock"
  }
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr:'5', daysToKeepStr: '', numToKeepStr: '5')
    disableConcurrentBuilds()
  }

  stages {
    stage('Build & Test') {
      // when {
      //   branch 'main'
      //   branch 'develop'
      // }   
      steps {
        echo "Running build !"
        dir('back-end/') {
          sh "npm i"
          // sh "docker compose up -d --build"
        }          
      }     
    }

    stage('Automated Testing') {
      steps {
        echo "Testing with Mocha !"
        dir('back-end/') {
          sh "npm run rebuild"          
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
        // steps {
        //   script {
        //     docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB_LOGIN') {
        //       // Push the Docker image to Docker Hub
        //       docker.image('fresnelcool/server-app:v0').push()
        //     }
        //   } 
        // }      
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
