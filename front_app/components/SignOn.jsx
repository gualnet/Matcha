/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import css from '../assets/scss/components/SignOn.scss'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignOnForm extends Component {
  constructor () {
    super()
    this.state = {
      // compte enregistrer pour les tests
      Login: 'jonny',
      FirstName: 'john',
      LastName: 'nom2famille',
      Mail: 'mail@mail.fr',
      Password: 'Passle01'
    }
    // this.context = this.props.userContext
  }

  // * arrow func (auto bind this)
  formHandleChange = (event, descriptor) => {
    console.log('DESCRIPTOR: ', descriptor)
    console.log('EVENT: ', event)
    if (!event.target) {
      return (false)
    } else {
      var value = event.target.value
    }
    switch (descriptor) {
      case 'login':
        this.setState({ Login: value })
        break
      case 'firstName':
        this.setState({ FirstName: value })
        break
      case 'lastName':
        this.setState({ LastName: value })
        break
      case 'mail':
        this.setState({ Mail: value })
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

    axios({
      method: 'post',
      url: 'http://localhost:8880/api/user/register/',
      data: valTab
    })
      .then((response) => {
        console.log('response ok: ', response)
        if (response.data.success === 'registration') {
          window.alert('New user registered')
        }
        // this.setState({ redirect: response.data.docInfo.redirectTo })
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  swapToSignIn = (event) => {
    event.preventDefault()
    // turn login form from side to face
    const sigininElem = document.getElementById('signinForm_back')
    console.log('-->', sigininElem.id)
    sigininElem.id = `${sigininElem.id.replace('_back', '')}`

    // turn register form from face to side
    const registerElem = document.getElementById('signonForm')
    // console.log('-->', registerElem.id)
    registerElem.id = `${registerElem.id}_back`
  }

  render () {
    // const userContext = this.props.userContext
    return (
      <div className='' id='signonWrapper'>
        <form
          className='box'
          id='signonForm_back'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >

          <div className='field'>
            <p className='control has-text-centered'>
              {/* <label className='label'>Login</label> */}
              <input
                className='input is-small'
                name='login'
                type='text'
                autoComplete='login'
                placeholder='login'
                onChange={ (e) => this.formHandleChange(e, 'login') }
                required='yes'
                value={this.state.Login}
              />
            </p>
          </div>

          <div className='field'>
            <p className='control has-text-centered'>
              {/* <label className='label'>First Name</label> */}
              <input
                className='input is-small'
                name="firstName"
                type='text'
                autoComplete='first name'
                placeholder='name'
                onChange={ (e) => this.formHandleChange(e, 'firstName') }
                required='yes'
                value={this.state.FirstName}
              />
            </p>
          </div>

          <div className='field'>
            <p className='control has-text-centered'>
              {/* <label className='label'>Last Name</label> */}
              <input
                className='input is-small'
                name="lastName"
                type='text'
                autoComplete='last name'
                placeholder='name'
                onChange={ (e) => this.formHandleChange(e, 'lastName') }
                required='yes'
                value={this.state.LastName}
              />
            </p>
          </div>

          <div className='field has-text-centered'>
            {/* <label className='label'>Mail</label> */}
            <p className='control has-icons-left has-text-centered'>
              <input
                className='input is-small'
                name="mail"
                type='email'
                placeholder='email'
                autoComplete='mail'
                onChange={ (e) => this.formHandleChange(e, 'mail') }
                required='yes'
                value={this.state.Mail}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>

          <div className='field has-text-centered'>
            {/* <label className='label'>Password</label> */}
            <p className='control has-icons-left has-text-centered'>
              <input
                className='input is-small'
                name="password"
                type='password'
                placeholder='password'
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

          <div className='has-text-centered' id='sigonBtnSubmit'>
            <button
              className='button is-small is-black is-outlined'
              id='BtnSignInSubmit'>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
