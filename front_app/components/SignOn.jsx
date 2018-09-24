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

  render () {
    const userContext = this.props.userContext
    return (
      <div className='signonWrapper'>
        <form
          className='box'
          id='signonForm'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >

          <p>Sign on User id: {userContext.uid}</p>
          <p>sign in token: {userContext.token}</p>
          <div className='field'>
            <p className='control'>
              <label className='label'>Login</label>
              <input
                className='input is-small'
                name='login'
                type='text'
                autoComplete='login'
                onChange={ (e) => this.formHandleChange(e, 'login') }
                required='yes'
                value={this.state.Login}
              />
            </p>
          </div>

          <div className='field'>
            <p className='control'>
              <label className='label'>First Name</label>
              <input
                className='input is-small'
                name="firstName"
                type='text'
                autoComplete='first name'
                onChange={ (e) => this.formHandleChange(e, 'firstName') }
                required='yes'
                value={this.state.FirstName}
              />
            </p>
          </div>

          <div className='field'>
            <p className='control'>
              <label className='label'>Last Name</label>
              <input
                className='input is-small'
                name="lastName"
                type='text'
                autoComplete='last name'
                onChange={ (e) => this.formHandleChange(e, 'lastName') }
                required='yes'
                value={this.state.LastName}
              />
            </p>
          </div>

          <div className='field'>
            <label className='label'>Mail</label>
            <p className='control has-icons-left'>
              <input
                className='input is-small'
                name="mail"
                type='email'
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
              <button id='BtnSignOnSubmit' className="button is-link is-small">Submit</button>
            </div>
            <div className="control">
              <button id='BtnSignOnSwap' className="button is-light is-small">SignIn</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
