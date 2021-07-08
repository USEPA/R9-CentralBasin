node {
    checkout scm
    sh "npm install"

    stage('unit test') {
        sh "npm test"
        publishCoverageGithub(filepath: './coverage/cobertura-coverage.xml', coverageXmlType: 'cobertura', comparisonOption: [ value: 'optionFixedCoverage', fixedCoverage: '0.65' ], coverageRateType: 'Lines')
    }
    stage('build') {
        sh "npm run build"
    }

//     stage('deploy') {
//         sh "rm -rf /var/r9centralbasin/html/${env.BRANCH_NAME}"
//         sh "cp -r ./dist /var/r9centralbasin/html/${env.BRANCH_NAME}"
//     }
}
