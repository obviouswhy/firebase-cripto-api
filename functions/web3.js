const Web3 = require('web3')

const {
  INFURA_ENDPOINT,
  INFURA_PROJECT_ID,
  MUMBAI_ENDPOINT,
  MUMBAI_PROJECT_ID,
} = require('./utils/consts')

const web3ConfigRopsten = {
  endpoint: INFURA_ENDPOINT || '',
  projectId: INFURA_PROJECT_ID || '',
}

const web3ConfigMumbai = {
  endpoint: MUMBAI_ENDPOINT || '',
  projectId: MUMBAI_PROJECT_ID || '',
}

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    web3ConfigRopsten.endpoint + web3ConfigRopsten.projectId,
  ),
)

const web3Mumbai = new Web3(
  new Web3.providers.HttpProvider(
    web3ConfigMumbai.endpoint + web3ConfigMumbai.projectId,
  ),
)

module.exports = { web3, web3Mumbai }
