node {
    stage('build') {
        checkout scm
        sh "npm run build"
    }
    stage('deploy') {
        sh "rm -rf /var/r9centralbasin/html/${env.BRANCH_NAME}"
        sh "cp -r ./dist /var/r9centralbasin/html/${env.BRANCH_NAME}"
    }
}
