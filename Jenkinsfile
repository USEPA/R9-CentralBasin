node {
    docker.image('node:lts').inside {
        checkout scm
        sh "npm install"

        stage('unit test') {
            sh "npm test"
        }
        stage('build') {
            sh "npm run build"
        }
    }

    stage('deploy') {
        sh "rm -rf /var/r9centralbasin/html/${env.BRANCH_NAME}"
        sh "cp -r ./dist /var/r9centralbasin/html/${env.BRANCH_NAME}"
    }
}
