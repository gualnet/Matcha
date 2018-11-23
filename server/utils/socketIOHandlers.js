import { UsersCtrl } from '../controlers/UsersCtrl'

// /* eslint-disable */
const socketHandlers = {
  openSocket (payload) {
    console.log('Client opened Socket [', payload, ']\n')
  },

  disconnect (payload) {
    if (payload === undefined) {
      payload = 'none'
    }
    console.log('Client disconnected [', payload, ']\n')
  },

  LoadMessagePage (socket, payload) {
    if (payload === undefined) {
      payload = 'none'
    }
    console.log('User [', payload.Login, '] arrived on message page \n')

    socket.emit('welcome', { msg: 'BIMGOUZ' })
  },

  /* eslint-disable */
  login (payload) {
    console.log('\nsocket handler login', payload, '\n')
    if (payload.uid !== null && payload.token !== null) {
      UsersCtrl.setUserAsConnected(payload)
    }
  },

  logout (payload) {
    console.log('\nsocket handler logout', payload, '\n')
    if (payload.uid !== null && payload.token !== null) {
      UsersCtrl.setUserAsDisconnected(payload)
    }
  }

}

export default socketHandlers
