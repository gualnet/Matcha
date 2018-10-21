/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Axios from 'axios'
import MsgPop from '../MsgPop/MsgPop.jsx'

// CSS
import './SignIn.scss'
/* eslint-enable no-unused-vars */

export default class SignInForm extends Component {
  constructor () {
    super()
    this.state = {
      // real local state
      visibility: 'is-invisible',

      Login: '',
      Password: ''
    }
    // this.userContext = this.props.userContext
    // console.log('constructor', this.userContext)
  }

  // * arrow func (auto bind this)
  formHandleChange = (event, descriptor) => {
    // console.log('DESCRIPTOR: ', descriptor)
    // console.log('EVENT: ', event)
    if (!event.target) {
      return (false)
    } else {
      var value = event.target.value
    }
    switch (descriptor) {
      case 'login':
        this.setState({ Login: value })
        break
      case 'password':
        this.setState({ Password: value })
        break
    }
  }

  checkValues () {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    var ret = true

    /* eslint-disable-next-line */
    if (this.state.Password == undefined ||
      !regexPassword.test(this.state.Password)) {
      console.log('Password is empty or not correct')

      const passwordElem = document.getElementsByName('Password')
      // console.log('passwordElem: ', passwordElem[0])
      passwordElem[0].style.border = '1px solid red'
      setTimeout(() => { passwordElem[0].style.border = '' }, 2500)

      ret = false
    }
    /* eslint-disable-next-line */
    if (this.state.Login == undefined ||
    this.state.Login.length < 2) {
      console.log('Login is empty or not correct')

      const loginElem = document.getElementsByName('Login')
      // console.log('loginElem: ', loginElem)
      loginElem[0].style.border = '1px solid red'
      setTimeout(() => { loginElem[0].style.border = '' }, 2500)
      ret = false
    }
    return (ret)
  }

  submitForm = (event) => {
    event.preventDefault()
    // * ================================
    if (!this.checkValues()) {
      // this.showLoginPassErr()
      return
    }
    const valTab = this.state

    Axios({
      method: 'post',
      url: '/api/user/login/',
      data: valTab
    })
      .then((response) => {
        console.log('%c response ok: ', 'color: green', response)
        if (response.data.success === 'login') {
          // window.alert('login success')
          const newUid = response.data.userState.uid
          const newToken = response.data.userState.token
          console.log('newUid & newToken: ', newUid, newToken)
          this.props.userContext.setState({
            uid: newUid,
            token: newToken
          })
        } else {
          console.log('%c response NOK: ', 'color: red', response)
        }
      })
      .catch((error) => {
        MsgPop.showPopup({ id: 'loginMsgpop' })
        console.log('response err: ', error)
      })
  }

  render () {
    return (
      <div>
        <MsgPop
          id='loginMsgpop'
          level='danger'
          message='Wrong login or password..'
        >
        </MsgPop>

        <div className='columns is-centered' id='signinColumns'>
          <div className='column is-half'>
            <form className='box' id='signinWrapper'>
              <div className='field is-horizontal' id='signinField1'>
                <div className='field-label'>
                  <label className='label has-text-white-ter'>Login</label>
                </div>
                <div className='field-body'>
                  <div className='control has-icons-left'>
                    <input
                      className='input'
                      name='Login'
                      type='text'
                      autoComplete='login'
                      placeholder='login - jonny'
                      onChange={(e) => this.formHandleChange(e, 'login')}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className='field is-horizontal' id='signinField2'>
                <div className='field-label'>
                  <label className='label has-text-white-ter'>Password</label>
                </div>
                <div className='field-body'>
                  <div className='control  has-icons-left'>
                    <input
                      className='input'
                      name='Password'
                      type='password'
                      autoComplete='password'
                      placeholder='Password - Passle01'
                      onChange={(e) => this.formHandleChange(e, 'password')}
                      required
                      value={this.state.Password}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className='field is-grouped is-grouped-centered'>
                <div className='control'>
                  <button
                    id='signinSubmitBtn'
                    className='button is-small is-dark is-outlined'
                    onClick={this.submitForm}
                  >Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    )
  }
}
