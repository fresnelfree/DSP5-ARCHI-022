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

    DOCKER_HUB_PWD = credentials('DOCKER_HUB_PASSWORD')
    DOCKER_HUB_USR = credentials('DOCKER_HUB_USERNAME')
    DB_HOST = "109.123.254.17"
    DB_PORT = 3307
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

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### STAGE BUILD #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"

        echo "####################################################### STAGE BUILD BACK-END #######################################################"
        dir('back-end/') {

          echo "************************ INSTALLING BACK-END DEPENDENCIES ************************"
          sh "npm install"

          echo "************************ BUILD OF PROJECT ************************"
          sh "npm run rebuild"   
        }  

        echo "####################################################### STAGE BUILD FRONT-END #######################################################"
        
        dir('front-end/') {

          echo "************************ INSTALLING FRONT-END DEPENDENCIES ************************"
          sh "npm install"

          echo "************************ BUILD OF PROJECT ************************"
          sh "npm run build"   
        }                 
      }  

    }  

    stage('UNIT TEST') {   

      steps {

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### STAGE UNIT TEST #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"

        echo "####################################################### STAGE UNIT TEST BACK-END #######################################################"
        dir('back-end/') {

          echo "************************ TEST OF PROJECT WITH MOCHA JS ************************"  
          sh "npm run test:prod"
        } 

        echo "####################################################### STAGE UNIT TEST FRONT-END #######################################################"
        dir('front-end/') {

          echo "************************ TEST OF PROJECT WITH CYPRESS ************************"  
          echo "A METTRE EN PLACE"
        }            
      }
    }

    stage('DEPLOY') {

      when {
        branch 'main'
        branch 'develop'
        branch 'DA-95'
        branch 'PR-*'
      } 
       
      steps{

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### STAGE DEPLOY #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"

        echo "####################################################### STAGE DEPLOY BACK-END #######################################################"
        dir('back-end/'){

          echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
          sh "docker compose down"
          sh "docker compose up -d --build"

          echo "************************ PUSH IMAGE IN DOCKER HUB ************************"
          sh "docker login --username=$DOCKER_HUB_USR --password=$DOCKER_HUB_PWD"
          sh "docker push fresnelcool/server-app-ppd:v0"          

        }   

        echo "####################################################### STAGE DEPLOY FRONT-END #######################################################"
        dir('front-end/'){

          echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
          sh "docker compose down"
          sh "docker compose up -d --build"

          echo "************************ PUSH IMAGE IN DOCKER HUB ************************"
          sh "docker login --username=$DOCKER_HUB_USR --password=$DOCKER_HUB_PWD"
          sh "docker push fresnelcool/client-app-ppd:v0"          

        } 

      }

    }    

  }
}
