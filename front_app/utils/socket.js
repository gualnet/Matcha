
import GVARS from '../utils/globalVars'
import openSocket from 'socket.io-client'

/* eslint-disable */

const storageContent = JSON.parse(window.localStorage.getItem('userContext'))
console.log('storageContent', storageContent)
const socket = openSocket(GVARS.backendURL)

function dataMsg () {
  if (storageContent &&
    storageContent.uid !== undefined &&
    storageContent.token) {
    return ({
      uid: storageContent.uid,
      token: storageContent.token
    })
  } else {
    return ({
      uid: null,
      token: null
    })
  }
}

socket.emit('openSocket', { 
  payload: {
    msg: 'openSocket',
    data: dataMsg()
  }
})

const socketHandlers = {
  login (payload) {
    socket.emit('login', payload)
  },

  logout (payload) {
    socket.emit('logout', payload)
  },

}

export { socket }
export default socketHandlers
