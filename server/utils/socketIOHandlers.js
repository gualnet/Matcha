
// /* eslint-disable */
const socketHandlers = {
  openSocket (data) {
    console.log('Client opened Socket [', data.msg, ']\n')
  },

  disconnect (data) {
    if (data === undefined) {
      data = 'none'
    }
    console.log('Client disconnected [', data, ']\n')
  },

  LoadMessagePage (socket, data) {
    if (data === undefined) {
      data = 'none'
    }
    console.log('User [', data.Login, '] arrived on message page \n')

    socket.emit('welcome', { msg: 'BIMGOUZ' })
  }

}

export default socketHandlers
