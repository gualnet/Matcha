'use strict'
// IMPORTS
import http from 'http'
import serverConf from '../utils/server'
import { router as apiRouter } from './apiRouter'

import socketHandlers from '../utils/socketIOHandlers'
// import io from 'socket.io'
const socketIo = require('socket.io')

const Express = require('express')
const BodyParser = require('body-parser')

// Initialisation
const app = Express()

// Static serv..
app.use('/public', Express.static('./UsersStorage'))
app.use('/assets', Express.static('./assets'))
// Body Parser config
app.use(BodyParser.json({
  limit: '2mb'
}))
app.use(BodyParser.urlencoded({
  limit: '2mb',
  extended: true
}))

// CORS auth
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*/*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Routes
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // res.setHeader('Content-Type', 'text/html')
  res.status(200).send('Welcome sur l\'api Matcha')
})

app.use('/api/', apiRouter())

const server = http.createServer(app)

// /* eslint-disable */
const io = socketIo(server)

io.on('connection', (socket) => {
  // console.log('New client connected ', socket)
  console.log('New client connected ')

  socket.on('openSocket', (rcv) => socketHandlers.openSocket(rcv))

  socket.on('disconnect', (rcv) => socketHandlers.disconnect(rcv))

  socket.on('load message page', (rcv) => socketHandlers.LoadMessagePage(socket, rcv))
})

server.listen(serverConf.serverPORT, () => {
  console.log('Listen on ', serverConf.serverIP, serverConf.serverPORT)
})
