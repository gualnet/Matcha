/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
// import css from '../assets/scss/components/SignIn.scss'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignInForm extends Component {
  constructor () {
    super()
    this.state = {
      // real local state
      visibility: 'is-invisible',

      // compte enregistrer pour les tests
      Login: 'jonny',
      Password: 'Passle01'
    }
    // this.userContext = this.props.userContext
    console.log('constructor', this.userContext)
  }

  // * arrow func (auto bind this)
  formHandleChange = (event, descriptor) => {
    console.log('DESCRIPTOR: ', descriptor)
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

  submitForm = (event) => {
    event.preventDefault()
    // * ================================
    const valTab = this.state

    axios({
      method: 'post',
      url: 'http://localhost:8880/api/user/login/',
      data: valTab
    })
      .then((response) => {
        console.log('response ok: ', response)
        if (response.data.success === 'login') {
          window.alert('login success')
          const newUid = response.data.userState.uid
          const newToken = response.data.userState.token
          this.props.userContext.setState({
            uid: newUid,
            token: newToken
          })
        }
        // this.setState({ redirect: response.data.docInfo.redirectTo })
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  swapToSignOn = (event) => {
    event.preventDefault()
    // turn login form from face to side
    const sigininElem = document.getElementById('signinForm')
    console.log('-->', sigininElem.id)
    sigininElem.id = `${sigininElem.id}_back`

    // turn register form from side to face
    const registerElem = document.getElementById('signonForm_back')
    console.log('-->', registerElem.id)
    registerElem.id = `${registerElem.id.replace('_back', '')}`
    console.log('-->', registerElem.id)
  }

  render () {
    // const userContext = this.props.userContext
    return (
      <div className='' id='signinWrapper'>
        <form
          className='box'
          id='signinForm'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >

          <div className='field'>
            <p className='control has-text-centered'>
              {/* <label className='label has-text-white'>Login / mail</label> */}
              <input
                className='input is-small'
                name='Login'
                type='text'
                autoComplete='login'
                placeholder='login'
                onChange={ (e) => this.formHandleChange(e, 'login') }
                required='yes'
                value={this.state.Login}
              />
            </p>
          </div>

          <div className='field has-text-centered'>
            {/* <label className='label has-text-white'>Password</label> */}
            <p className='control has-icons-left has-text-centered'>
              {/* <p className='control has-text-centered has-icons-left'> */}
              <input
                className='input is-small'
                name="password"
                type='password'
                autoComplete='password'
                placeholder='password'
                onChange={ (e) => this.formHandleChange(e, 'password') }
                required='yes'
                value={this.state.Password}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
            </p>
          </div>

          <div className='has-text-centered' id='siginBtnSubmit'>
            <button
              className='button is-small is-black is-outlined'
              id='BtnSignInSubmit'>Submit</button>
          </div>

        </form>
      </div>
    )
  }
}