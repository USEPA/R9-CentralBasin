node {
    checkout scm
    bat "npm install"

    stage('unit test') {
        bat "npm test"
        publishCoverageGithub(filepath: './coverage/cobertura-coverage.xml', coverageXmlType: 'cobertura', comparisonOption: [ value: 'optionFixedCoverage', fixedCoverage: '0.65' ], coverageRateType: 'Lines')
    }
    stage('build') {
        bat "npm run build"
    }

//     stage('deploy') {
//         bat "rm -rf /var/r9centralbasin/html/${env.BRANCH_NAME}"
//         bat "cp -r ./dist /var/r9centralbasin/html/${env.BRANCH_NAME}"
//     }
}
