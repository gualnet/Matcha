/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignOnForm extends Component {
  constructor () {
    super()
    this.state = {
      // formData
      Login: 'jonny',
      FirstName: 'john',
      LastName: 'nom2famille',
      Mail: 'mail@mail.fr',
      Password: 'Passle01'
    }
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
    return (
      <div className='signonWrapper'>
        <form
          className='signonForm'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >
          <ul>
            <li>Login</li>
            <input
              // autoComplete='Your login'
              type='text'
              name='login'
              onChange={ (e) => this.formHandleChange(e, 'login') }
              required='yes'
              value={this.state.Login}
            ></input>

            <li>First Name</li>
            <input
              autoComplete='Your login'
              type='text'
              name="firstName"
              onChange={ (e) => this.formHandleChange(e, 'firstName') }
              required='yes'
              value={this.state.FirstName}
            ></input>

            <li>Last Name</li>
            <input
              autoComplete='blabla'
              type='text'
              name="lastName"
              onChange={ (e) => this.formHandleChange(e, 'lastName') }
              required='yes'
              value={this.state.LastName}
            ></input>

            <li>Mail</li>
            <input
              autoComplete='blabla'
              type='email'
              name="mail"
              onChange={ (e) => this.formHandleChange(e, 'mail') }
              required='yes'
              value={this.state.Mail}
            ></input>

            <li>Password</li>
            <input
              autoComplete='blabla'
              type='password'
              name="password"
              onChange={ (e) => this.formHandleChange(e, 'password') }
              required='yes'
              value={this.state.Password}
            ></input>

            <button
              type="submit"
              value="submit"
            >register</button>
          </ul>
        </form>
      </div>
    )
  }
}
