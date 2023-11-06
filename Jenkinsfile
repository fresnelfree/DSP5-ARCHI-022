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
    DB_HOST = credentials('DB_HOST')
    DB_PORT = credentials('DB_PORT')
    DB_USER = credentials('DB_USER')
    APP_PORT = credentials('APP_PORT')
    APP_HOST = credentials('APP_HOST')
    DB_PWD = credentials('DB_PWD')
    DB_DATABASE = credentials('DB_DATABASE')
    DOCKER_HUB_LOGIN = credentials('DOCKER_HUB_LOGIN')
    IMG_TAG = '1.0.0'
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
              sh "docker compose down"
              sh "docker compose up -d --build --build-arg IMAGE_TAG=${IMG_TAG}"
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
          sh "npm run migrate"
          sh ""
        } 

        echo "####################################################### STAGE UNIT TEST FRONT-END #######################################################"
        dir('front-end/') {

          echo "************************ TEST OF PROJECT WITH CYPRESS ************************"  
          echo "A METTRE EN PLACE"
        }            
      }
    }

    stage('DEPLOY') {

      // when {
      //   branch 'main'
      //   branch 'develop'
      //   branch 'DA-95'
      //   branch 'PR-*'
      // } 
      when {
          not {
              branch "DA-*"
          }
      }       
      steps{

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### STAGE DEPLOY #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"
        script {
          if (env.GIT_BRANCH == 'main') {

            echo "####################################################### STAGE DEPLOY APP #######################################################"
            
            echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
            sh "docker compose down"
            sh "docker compose up -d --build"

            echo "************************ PUSH IMAGE IN DOCKER HUB ************************"
            sh "docker login --username=$DOCKER_HUB_USR --password=$DOCKER_HUB_PWD"
            sh "docker push fresnelcool/server-app:v0"
            sh "docker push fresnelcool/client-app:v0"

          }
          else if (env.GIT_BRANCH == 'develop') {           

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
          else {

          }
        }
 

      }

    }    

  }
}
