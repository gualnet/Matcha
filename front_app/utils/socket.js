
import GVARS from '../utils/globalVars'
import openSocket from 'socket.io-client'

const socket = openSocket(GVARS.backendURL)
socket.emit('openSocket', { msg: 'openSocket' })

const socketHandlers = {
  connect (data) {
    socket.emit('test', data)
  }
}

// function connect (cb) {
//   socket.on('chat', (message) => {
//     console.log(message)
//     cb(message)
//   })
// }

export default socketHandlers
export { socket }
