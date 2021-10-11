const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

const app = express()

admin.initializeApp()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/mycoin', require('./routes/mycoin.routes'))
app.use('/bluetok', require('./routes/bluetok.routes'))

exports.app = functions.https.onRequest(app)
