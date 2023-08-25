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
    stage('BUILD') {   
      steps {
        echo "Running build !"
        dir('back-end/') {

          echo "************************ INSTALLATION DES DEPENDANCES DU PROJET ************************"
          sh "npm install"

          echo "************************ BUILD DU PROJET ************************"
          sh "npm run rebuild"   

        }          
      }     
    }  

    stage('UNIT TEST') {     
      steps {

        echo "************************ TEST DU PROJET AVEC MOCHA JS ************************"   
        sh "npm run test:prod"    

      }
    }

    stage('DEPLOY') {
      // when {
      //   branch 'main'
        // branch develop
      // } 

      echo "************************ BUILD & RUN IMAGE DOCKER ************************"        
      steps{
        dir('back-end/'){
          sh "docker compose up -d --build"
        }
      }

      echo "************************ PUSH IMAGE IN DOCKER HUB ************************"
      steps {
        steps {
          sh "docker login --username=credentials('DOCKER_HUB_USERNAME') --password=credentials('DOCKER_HUB_PASSWORD')"
          sh "docker push fresnelcool/server-app-ppd:v0"
          // script {
          //   docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_HUB_LOGIN') {
          //     // Push the Docker image to Docker Hub
          //     docker.image('fresnelcool/server-app:v0').push()
          //   }
          // } 
        }      
      }

    }    

  }
}
