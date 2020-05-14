
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import socketHandlers, { socket } from '../utils/socket'

// ! Dev
import ReactJson from 'react-json-view'
/* eslint-enable no-unused-vars */

/* eslint-disable */
class Message extends Component {

  componentWillMount () {
    socket.emit('load message page', {Login: this.props.userContext.userData.Login})
  }

  socketHandlersMessage () {
    socket.on('welcome', (data) => {
      console.log('socketHandlersMessage - welcome - ', data, '')
    })
  }

  render () {
    this.socketHandlersMessage()

    return (
      <div className='messageWrapper'>
        <p>MESSAGE PAGE</p>
        <ReactJson src={this.props} name='props' collapsed='1'/>
      </div>
    )
  }
}
import { format } from 'util';

export default Message
