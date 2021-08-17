node {
    configFileProvider([configFile(fileId: "d5c35859-b519-4869-ab0d-7f51f9ad90d5", variable: 'configFile')]) {
      props = readProperties file: "$configFile"
      env.HOST_ADDRESS = props['HOST_ADDRESS']
      env.PUBLIC_DOMAIN = props['PUBLIC_DOMAIN']
    }
    checkout scm
    stage('install dependencies') {
        bat "npm install"
    }
//     stage('unit test') {
//         bat "npm test"
//         publishCoverageGithub(filepath: './coverage/cobertura-coverage.xml', coverageXmlType: 'cobertura', comparisonOption: [ value: 'optionFixedCoverage', fixedCoverage: '0.65' ], coverageRateType: 'Lines')
//     }
    stage('build') {
        if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "staging") {
            bat "npm run build"
        }
        else {
            bat "npm run build-dev"
        }
//         slackSend(channel:"#r9-service-alerts", message: "R9 Central Basin branch ${env.BRANCH_NAME} deployed to STAGING\nReview: https://${env.PUBLIC_DOMAIN}/apps/staging/r9cop/${env.BRANCH_NAME}/")
    }

//     stage('deploy staging') {
//         bat "rm -rf /var/r9centralbasin/html/${env.BRANCH_NAME}"
//         bat "cp -r ./dist /var/r9centralbasin/html/${env.BRANCH_NAME}"
//     }
    if (env.BRANCH_NAME != "master") {
        stage('deploy staging') {
            powershell "Remove-Item -Recurse -Force \\\\${env.HOST_ADDRESS}\\R9Apps\\staging\\CentralBasin\\${env.BRANCH_NAME}"
            bat "xcopy /e/h/i/y dist \\\\${env.HOST_ADDRESS}\\R9Apps\\staging\\CentralBasin\\${env.BRANCH_NAME}"
            bat "xcopy /i/y web.config \\\\${env.HOST_ADDRESS}\\R9Apps\\staging\\CentralBasin\\${env.BRANCH_NAME}"
            slackSend(channel:"#r9-service-alerts", message: "R9 Central Basin branch ${env.BRANCH_NAME} deployed to STAGING\nReview: https://${env.PUBLIC_DOMAIN}/apps/staging/centralbasin/${env.BRANCH_NAME}/")
        }
    }
    if (env.BRANCH_NAME == "master") {
        stage('deploy') {
            powershell "Remove-Item -Recurse -Force \\\\${env.HOST_ADDRESS}\\R9Apps\\CentralBasin\\*"
            bat "xcopy /e/h/i/y dist \\\\${env.HOST_ADDRESS}\\R9Apps\\CentralBasin"
            bat "xcopy /i/y web.config \\\\${env.HOST_ADDRESS}\\R9Apps\\CentralBasin"
            slackSend(channel:"#r9-service-alerts", message: "R9 Central Basin branch ${env.BRANCH_NAME} deployed to PRODUCTION\nReview: https://${env.PUBLIC_DOMAIN}/centralbasin/")
        }
    }
}
