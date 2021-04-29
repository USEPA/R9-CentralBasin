node {
    stage('build') {
        checkout scm
        docker.image('node:lts').inside {
            sh "npm install"
            sh "npm run build"
        }
    }
    stage('deploy') {
        sh "rm -rf /var/r9centralbasin/html/${env.BRANCH_NAME}"
        sh "cp -r ./dist /var/r9centralbasin/html/${env.BRANCH_NAME}"
    }
}
