node {
    configFileProvider([configFile(fileId: "d5c35859-b519-4869-ab0d-7f51f9ad90d5", variable: 'configFile')]) {
      props = readProperties file: "$configFile"
      env.HOST_ADDRESS = props['HOST_ADDRESS']
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
        bat "npm run build"
    }

//     stage('deploy staging') {
//         bat "rm -rf /var/r9centralbasin/html/${env.BRANCH_NAME}"
//         bat "cp -r ./dist /var/r9centralbasin/html/${env.BRANCH_NAME}"
//     }
    if (env.BRANCH_NAME == "master") {
        stage('deploy') {
            bat "del /f /q /S \\\\${env.HOST_ADDRESS}\\R9Apps\\CentralBasin\\*"
            bat "xcopy /e/h/i/y dist \\\\${env.HOST_ADDRESS}\\R9Apps\\CentralBasin"
            bat "xcopy /i/y web.config \\\\${env.HOST_ADDRESS}\\R9Apps\\CentralBasin"
        }
    }
}
