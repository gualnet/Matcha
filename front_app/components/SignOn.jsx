/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import css from '../assets/scss/components/SignOn.scss'
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
    return (
      <div className='columns is-centered' id='signonColumns'>
        <div className='column is-half is-centered'>

          {/* <form className='box' id='signonWrapper'> */}
          <form className='box' id='signonWrapper_back'>
            <div className='field is-horizontal' id='signonField1'>
              <div className='field-label'>
                <label className='label has-text-white-ter'>Login</label>
              </div>
              <div className='field-body'>
                <div className='control'>
                  <input
                    className='input'
                    name='login'
                    type='text'
                    autoComplete='login'
                    placeholder='login'
                    onChange={(e) => this.formHandleChange(e, 'login')}
                    required='yes'
                    value={this.state.Login}
                  />
                </div>
              </div>
            </div>

            <div className='field is-horizontal' id='signonField2'>
              <div className='field-label'>
                <label className='label has-text-white-ter'>Name</label>
              </div>
              <div className='field-body'>
                <div className='control'>
                  <input
                    className='input'
                    name='firstName'
                    type='text'
                    autoComplete='first name'
                    placeholder='name'
                    onChange={(e) => this.formHandleChange(e, 'firstName')}
                    required='yes'
                    value={this.state.FirstName}
                  />
                </div>
              </div>
            </div>

            <div className='field is-horizontal' id='signonField3'>
              <div className='field-label'>
                <label className='label has-text-white-ter'>Surname</label>
              </div>
              <div className='field-body'>
                <div className='control'>
                  <input
                    className='input'
                    name='lastName'
                    type='text'
                    autoComplete='last name'
                    placeholder='surname'
                    onChange={(e) => this.formHandleChange(e, 'lastName')}
                    required='yes'
                    value={this.state.LastName}
                  />
                </div>
              </div>
            </div>

            <div className='field is-horizontal' id='signonField4'>
              <div className='field-label'>
                <label className='label has-text-white-ter'>Mail</label>
              </div>
              <div className='field-body'>
                <div className='control'>
                  <input
                    className='input'
                    name="mail"
                    type='email'
                    placeholder='email'
                    autoComplete='mail'
                    onChange={(e) => this.formHandleChange(e, 'mail')}
                    required='yes'
                    value={this.state.Mail}
                  />
                </div>
              </div>
            </div>

            <div className='field is-horizontal' id='signonField5'>
              <div className='field-label'>
                <label className='label has-text-white-ter'>Password</label>
              </div>
              <div className='field-body'>
                <div className='control'>
                  <input
                    className='input'
                    name="password"
                    type='password'
                    placeholder='password'
                    autoComplete='password'
                    onChange={(e) => this.formHandleChange(e, 'password')}
                    required='yes'
                    value={this.state.Password}
                  />
                </div>
              </div>
            </div>

            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <button id='signonSubmitBtn' className='button is-small is-dark is-outlined'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
