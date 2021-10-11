const express = require('express')
const axios = require('axios')
const { web3Mumbai } = require('../web3')
const BlueTokABI = require('../ABIs/BlueTokABI')
const constants = require('../utils/consts')

const router = express.Router()

const { BLUETOK_CONTRACT_ADDRESS } = constants

const nftContract = new web3Mumbai.eth.Contract(
  BlueTokABI,
  BLUETOK_CONTRACT_ADDRESS,
)

// ----------------- Get Info -----------------

router.get('/get-info', async (req, res) => {
  const response = {}
  try {
    response.name = await nftContract.methods.name().call()
    response.symbol = await nftContract.methods.symbol().call()
    response.contractAddress = BLUETOK_CONTRACT_ADDRESS
    response.totalSupply = await nftContract.methods.totalSupply().call()

    return res.status(200).send(response)
  } catch (err) {
    return res.status(500).send({ error: err.message.toString() })
  }
})

// ----------------- Get Balance -----------------

router.get('/get-balance', async (req, res) => {
  const { address } = req.query

  try {
    if (!address) throw new Error('Please provide an "address" parameter')

    const balanceMFT = await nftContract.methods.balanceOf(address).call()

    return res.status(200).send({ balance: balanceMFT })
  } catch (err) {
    return res.status(500).send({ error: err.message.toString() })
  }
})

// ----------------- Get All From -----------------

router.get('/get-all-from', async (req, res) => {
  const { address } = req.query
  const tokenIDs = []

  try {
    if (!address) throw new Error('Please provide an "address" parameter')

    const balanceMFT = await nftContract.methods.balanceOf(address).call()

    for (let i = 0; i < balanceMFT; i++) {
      const token = await nftContract.methods
        .tokenOfOwnerByIndex(address, i)
        .call()
      tokenIDs.push(token)
    }

    return res.status(200).send({ tokens: tokenIDs })
  } catch (err) {
    return res.status(500).send({ error: err.message.toString() })
  }
})

// ----------------- Get Metadata -----------------

router.get('/get-metadata', async (req, res) => {
  const { id } = req.query
  try {
    if (!id) throw new Error('Please provide an "id" parameter')

    const tokenURI = await nftContract.methods.tokenURI(id).call()
    const response = await axios.get(tokenURI)
    const metadata = response.data

    console.log(metadata)

    return res.status(200).send({ metadata })
  } catch (err) {
    return res.status(500).send({ error: err.message.toString() })
  }
})

module.exports = router
