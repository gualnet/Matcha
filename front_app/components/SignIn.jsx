/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import css from '../assets/scss/components/SignIn.scss'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignInForm extends Component {
  constructor () {
    super()
    this.state = {
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

  submitForm = (e) => {
    e.preventDefault()
    // * ================================
    const valTab = this.state
    // this.props.userContext.uid = 'machin'
    // this.setState({ uid: 'machin' })
    // console.log('... ', this.props.userContext)
    // this.props.userContext.setState({ uid: 'machin', token: 'plus' })

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

  render () {
    const userContext = this.props.userContext
    console.log('render', this.userContext)
    return (
      <div className='signinWrapper'>
        <form
          className='box'
          id='signinForm'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >

          <p>sign in user id: {userContext.uid}</p>
          <p>sign in token: {userContext.token}</p>
          <div className='field'>
            <p className='control'>
              <label className='label'>Login / mail</label>
              <input
                className='input is-small'
                name='Login'
                type='text'
                autoComplete='login'
                onChange={ (e) => this.formHandleChange(e, 'login') }
                required='yes'
                value={this.state.Login}
              />
            </p>
          </div>

          <div className='field'>
            <label className='label'>Password</label>
            <p className='control has-icons-left'>
              <input
                className='input is-small'
                name="password"
                type='password'
                autoComplete='password'
                onChange={ (e) => this.formHandleChange(e, 'password') }
                required='yes'
                value={this.state.Password}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
            </p>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button id='BtnSignInSubmit' className="button is-link is-small">Submit</button>
            </div>
            <div className="control">
              <button id='BtnSignInSwap' className="button is-light is-small">Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
