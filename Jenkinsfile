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
    // DB_DATABASE = credentials('DB_DATABASE')
    DB_DATABASE = 'DSP5-ARCHI-DB-INT'    
    DOCKER_HUB_LOGIN = credentials('DOCKER_HUB_LOGIN')
    IMG_TAG_INT = '1.0.0'
    IMG_TAG_PPD = '1.0.0'
    IMG_TAG = '1.0.0'

    SCANNER_HOME = tool 'SonarQubeScanner';
    // DOCKER_HOST = "/var/run/docker.sock"
  }
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr:'5', daysToKeepStr: '', numToKeepStr: '5')
    disableConcurrentBuilds()
  }

  stages {

    stage('SonarQube Analysis') {   
      when {
        not {
          anyOf {
              branch 'main'
              branch 'release'
          }
        }          
      } 
      steps {

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### SonarQube Analysis #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"        
        // withSonarQubeEnv() {
        //   sh '${SCANNER_HOME}/bin/sonar-scanner'
        // }
        withSonarQubeEnv('sonarqube') {
          sh '${SCANNER_HOME}/bin/sonar-scanner'
        }
      }
    }    

    stage('BUILD') { 
      when {
        not {
          branch "main"
        }
      } 
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
          sh "npm install --force"

          echo "************************ BUILD OF PROJECT ************************"
          sh "npm run build:ssr"   
        }                 
      }  

    }  

    stage('UNIT TEST') {   
      when {
        not {
          branch "main"
        }
      } 
      steps {

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### STAGE UNIT TEST #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"

        echo "####################################################### STAGE UNIT TEST BACK-END #######################################################"
        dir('back-end/') {

          echo "************************ TEST OF PROJECT WITH MOCHA JS ************************"  
          sh "npm run migrate"
          sh "npm run test:dev"
        } 

        echo "####################################################### STAGE UNIT TEST FRONT-END #######################################################"
        dir('front-end/') {

          echo "************************ TEST OF PROJECT WITH CYPRESS ************************"  
          echo "A METTRE EN PLACE !"
        }            
      }
    }

    stage('DEPLOY') {   
      when {
          not {
              branch "DA-*"
          }
      } 
      steps {

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### DEPLOY #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"
        script {

          if (env.GIT_BRANCH == 'main') {

            echo "####################################################### DEPLOY APP IN PRODUCTION #######################################################"
            
            dir('workflow/prod/'){

              echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
              sh "docker compose down"
              sh "docker compose up -d --build"        
            }   

          }
          else if (env.GIT_BRANCH == 'release') {           

            echo "####################################################### DEPLOY APP IN RELEASE #######################################################"
            dir('workflow/release/'){

              echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
              sh "docker compose down"
              sh "docker compose up -d --build"        
            }   
                
          }
          else if (env.GIT_BRANCH == 'develop') {
            echo "####################################################### DEPLOY APP IN INTEGRATION (INT) #######################################################"
            dir('workflow/dev/'){

              echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
              sh "docker compose down"
              sh "docker compose up -d --build"        
            }             
          }   

        }
           
      }
    }    

    stage('PUSH IMAGE IN DOCKER HUB') {   
      when {
          not {
              branch "DA-*"
          }
      } 
      steps {

        echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### BUILD & RUN IMAGE DOCKER #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"
       
        echo "####################################################### CONNECTION ON DOCKER HUB #######################################################"
        // sh "docker login --username=$DOCKER_HUB_USR --password=$DOCKER_HUB_PWD"    
        
        script {
          if (env.GIT_BRANCH == 'main') {

            echo "************************ PUSH IMAGE IN DOCKER HUB ************************"
            echo " "
            echo "************************ PUSH IMAGE BACK-END IN DOCKER HUB ************************"            
            sh "docker push fresnelcool/server-app:$IMG_TAG"
            echo "************************ PUSH IMAGE FRONT-END IN DOCKER HUB ************************"            
            sh "docker push fresnelcool/client-app:$IMG_TAG"

          }

          else if (env.GIT_BRANCH == 'release') {

            echo "************************ PUSH IMAGE BACK-END IN DOCKER HUB ************************"
            sh "docker push fresnelcool/server-app-ppd:$IMG_TAG_PPD"  

            echo "************************ PUSH IMAGE FRONT-END IN DOCKER HUB ************************"
            sh "docker push fresnelcool/client-app-ppd:$IMG_TAG_PPD"    

          }

          else if (env.GIT_BRANCH == 'develop'){

            echo "************************ PUSH IMAGE BACK-END IN DOCKER HUB ************************"
            sh "docker push fresnelcool/server-app-int:$IMG_TAG_INT"  

            echo "************************ PUSH IMAGE FRONT-END IN DOCKER HUB ************************"
            sh "docker push fresnelcool/client-app-int:$IMG_TAG_INT"

          }
        }
           
      }
    }    

    // stage('DEPLOY') {

    //   // when {
    //   //   branch 'main'
    //   //   branch 'develop'
    //   //   branch 'DA-95'
    //   //   branch 'PR-*'
    //   // } 
    //   when {
    //       not {
    //           branch "DA-*"
    //       }
    //   }       
    //   steps{

    //     echo "#####+++++++++++++++++++++++++++++++++++++++++++++++++++++++##### STAGE DEPLOY #####+++++++++++++++++++++++++++++++++++++++++++++++++++++++#####"
    //     script {
    //       if (env.GIT_BRANCH == 'main') {

    //         echo "####################################################### STAGE DEPLOY APP #######################################################"
            
    //         echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
    //         sh "docker compose down"
    //         sh "docker compose up -d --build"

    //         echo "************************ PUSH IMAGE IN DOCKER HUB ************************"
    //         sh "docker login --username=$DOCKER_HUB_USR --password=$DOCKER_HUB_PWD"
    //         sh "docker push fresnelcool/server-app:$IMG_TAG"
    //         sh "docker push fresnelcool/client-app:$IMG_TAG"

    //       }
    //       else if (env.GIT_BRANCH == 'develop') {           

    //         echo "####################################################### STAGE DEPLOY BACK-END #######################################################"
    //         dir('back-end/'){

    //           echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
    //           sh "docker compose down"
    //           sh "docker compose up -d --build"        
    //         }   

    //         echo "####################################################### STAGE DEPLOY FRONT-END #######################################################"
    //         dir('front-end/'){

    //           echo "************************ BUILD & RUN IMAGE DOCKER ************************"            
    //           sh "docker compose down"
    //           sh "docker compose up -d --build"       

    //         }
    //           echo "************************ CONNECTION ON DOCKER HUB ************************"
    //           sh "docker login --username=$DOCKER_HUB_USR --password=$DOCKER_HUB_PWD"

    //           echo "************************ PUSH IMAGE BACK-END IN DOCKER HUB ************************"
    //           sh "docker push fresnelcool/server-app-ppd:$IMG_TAG_PPD"  

    //           echo "************************ PUSH IMAGE FRONT-END IN DOCKER HUB ************************"
    //           sh "docker push fresnelcool/client-app-ppd:$IMG_TAG_PPD"                 
    //       }
    //       else {

    //       }
    //     }
 

    //   }

    // }    

  }
}
