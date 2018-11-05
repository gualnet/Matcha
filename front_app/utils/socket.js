
import GVARS from '../utils/globalVars'
import openSocket from 'socket.io-client'

const socket = openSocket(GVARS.backendURL)

function connect (cb) {
  socket.on('chat', (message) => {
    console.log(message)
    cb(message)
  })
}

export { connect }
