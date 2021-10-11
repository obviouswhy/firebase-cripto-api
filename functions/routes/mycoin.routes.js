const express = require('express')
const { web3 } = require('../web3')
const MyCoinABI = require('../ABIs/MyCoinABI')
const constants = require('../utils/consts')

const router = express.Router()

const { MYCOIN_CONTRACT_ADDRESS } = constants

// ----------------- Get Balance -----------------

router.get('/get-balance', async (req, res) => {
  const { address } = req.query

  try {
    if (!address) throw new Error('Please provide an "address" parameter')

    const coinContract = new web3.eth.Contract(
      MyCoinABI,
      MYCOIN_CONTRACT_ADDRESS,
    )

    const balanceMYC = await coinContract.methods.balanceOf(address).call()

    return res.status(200).send({ balance: balanceMYC })
  } catch (err) {
    return res.status(500).send({ error: err.message.toString() })
  }
})

// ----------------- Transfer -----------------

router.post('/transfer', async (req, res) => {
  const { from, senderPrivateKey, to, amount } = req.body

  try {
    if (!from || !senderPrivateKey || !to || !amount) {
      throw new Error(
        'Please make sure you have sent all the parameters\n ["from", "senderPrivateKey", "to", "amount"]',
      )
    }

    const coinContract = new web3.eth.Contract(
      MyCoinABI,
      MYCOIN_CONTRACT_ADDRESS,
      {
        from: from,
      },
    )

    const options = {
      to: MYCOIN_CONTRACT_ADDRESS,
      data: coinContract.methods.transfer(to, amount).encodeABI(),
      gas: await coinContract.methods
        .transfer(to, amount)
        .estimateGas({ from }),
      gasPrice: await web3.eth.getGasPrice(),
    }

    const signed = await web3.eth.accounts.signTransaction(
      options,
      senderPrivateKey,
    )

    await web3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .on('transactionHash', hash => {
        return res.status(200).send({ transactionHash: hash })
      })
    // .on('receipt', receipt => {
    //   console.log(receipt)
    // })
    // .on('error', err => {
    //   throw new Error(err)
    // })
  } catch (err) {
    return res.status(500).send({ error: err.message.toString() })
  }
})

module.exports = router
