'use strict'
// IMPORTS
import serverConf from '../utils/server'
import { router as apiRouter } from './apiRouter'
const Express = require('express')
const BodyParser = require('body-parser')

// Initialisation
const server = Express()

// Static serv..
server.use('/static', Express.static('public'))
// Body Parser config
server.use(BodyParser.urlencoded({ extended: true }))
server.use(BodyParser.json())

// CORS auth
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Routes
server.get('/', (req, res) => {
  console.log('BOOOM000')
  res.setHeader('Content-Type')
  // res.setHeader('Content-Type', 'text/html')
  res.status(200).send('<h1> Welcome </h1>')
})

server.use('/api/', apiRouter())

server.listen(serverConf.serverPORT, () => {
  console.log('Listen on ', serverConf.serverIP, serverConf.serverPORT)
})
