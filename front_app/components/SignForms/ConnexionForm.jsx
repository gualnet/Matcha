
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'

import MsgPop from '../MsgPop/MsgPop.jsx'
import socketHandlers from '../../utils/socket'

// CSS
import './ConnexionForm.scss'
/* eslint-enable no-unused-vars */

class ConnexionForm extends Component {
  state = {
    loginVal: '',
    passVal: ''
  }

  // used in navbar
  static showConForm = () => {
    const elem = document.getElementById('ConnexionFormWrapper')
    elem.style.display = 'block'
  }

  hideConForm = () => {
    const elem = document.getElementById('ConnexionFormWrapper')
    elem.style.display = 'none'
  }

  formHandleChange = (event, descriptor) => {
    if (!event.target) {
      return (false)
    } else {
      var value = event.target.value
    }
    switch (descriptor) {
      case 'login':
        this.setState({ loginVal: value })
        break
      case 'password':
        this.setState({ passVal: value })
        break
    }
  }

  submitValues = (event) => {
    if (event.type === 'keypress' && event.key !== 'Enter') {
      return
    }

    if (this.state.loginVal.length < 2) {
      const elem = document.getElementById('errorMsgLogin')
      const elem2 = document.getElementById('inputLogin')
      elem.style.display = 'block'
      elem2.style.border = '1px solid red'
      elem2.style.backgroundColor = 'rgba(255, 0, 0, 0.300)'
      setTimeout(() => {
        elem.style.display = 'none'
        elem2.style.border = ''
        elem2.style.backgroundColor = ''
      }, 5000)
    }
    if (this.state.passVal.length < 8) {
      const elem = document.getElementById('errorMsgPassword')
      const elem2 = document.getElementById('inputPassword')
      elem.style.display = 'block'
      elem2.style.border = '1px solid red'
      elem2.style.backgroundColor = 'rgba(255, 0, 0, 0.200)'
      setTimeout(() => {
        elem.style.display = 'none'
        elem2.style.border = ''
        elem2.style.backgroundColor = ''
      }, 5000)
      return
    }
    const valTab = {
      Login: this.state.loginVal,
      Password: this.state.passVal
    }

    axios({
      method: 'POST',
      url: '/api/user/login/',
      data: valTab
    })
      .then((response) => {
        console.log('%c response ok: ', 'color: green', response)
        if (response.data.success) {
          // window.alert('login success')
          const newUid = response.data.result.UserId
          const newToken = response.data.result.UserToken
          console.log('newUid & newToken: ', newUid, newToken)
          this.props.userContext.setState({
            uid: response.data.result.UserId,
            token: response.data.result.UserToken
            // userData: response.data.result
          })

          // socket send login status
          socketHandlers.login({
            uid: response.data.result.UserId,
            token: response.data.result.UserToken
          })
          // this.hideConForm()
          this.props.userContext.getUserInfos(response.data.result.UserId, response.data.result.UserToken)
        } else {
          console.log('%c response NOK: ', 'color: red', response)
          MsgPop.showPopup({ id: 'ConnexionFormErr' })
        }
      })
      .catch((error) => {
        console.log('response err: ', error)
        MsgPop.showPopup({ id: 'ConnexionFormErr' })
      })
  }

  render () {
    // console.log('ConnexionForm RENDER', this.props.userContext)
    return (
      <div className='modal' id='ConnexionFormWrapper'>
        <MsgPop
          id='ConnexionFormErr'
          level='warning'
          message='Login and / or password incorrect'
        />
        <div className='modal-background' onClick={this.hideConForm}></div>
        <div className='modal-content'>
          <div className='box'>

            <div className='field'>
              <div className='control'>
                <input required className='input' type='text' id='inputLogin' placeholder='Login or email' onChange={(e) => this.formHandleChange(e, 'login')} onKeyPress={this.submitValues}/>
              </div>
              <p className='errorMsg' id='errorMsgLogin'>wrong login or email</p>
            </div>

            <div className='field'>
              <div className='control'>
                <input required className='input' type='password' id='inputPassword' placeholder='Password' onChange={(e) => this.formHandleChange(e, 'password')} onKeyPress={this.submitValues}/>
              </div>
              <p className='errorMsg' id='errorMsgPassword'>Password length is not correct</p>
            </div>

            <div className='bottomContent'>
              <button className='button is-link' onClick={this.submitValues}>Connect</button>
              <p id='recovPassMsg'>recover my password</p>
            </div>

          </div>
          <button className='modal-close is-large' aria-label='close'></button>
        </div>
      </div>
    )
  }
}

export default ConnexionForm
