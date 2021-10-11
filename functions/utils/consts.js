const functions = require('firebase-functions')

const INFURA_ENDPOINT = 'https://ropsten.infura.io/v3/'
const INFURA_PROJECT_ID = functions.config().infura.project
const MYCOIN_CONTRACT_ADDRESS = functions.config().mycoin.contract
const MUMBAI_ENDPOINT = 'https://rpc-mumbai.maticvigil.com/v1/'
const MUMBAI_PROJECT_ID = functions.config().matic.project
const BLUETOK_CONTRACT_ADDRESS = functions.config().bluetok.contract

module.exports = {
  INFURA_ENDPOINT,
  INFURA_PROJECT_ID,
  MYCOIN_CONTRACT_ADDRESS,
  MUMBAI_ENDPOINT,
  MUMBAI_PROJECT_ID,
  BLUETOK_CONTRACT_ADDRESS,
}
