/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignInForm extends Component {
  constructor () {
    super()
    this.state = {
      Login: 'jonny',
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
      url: 'http://localhost:8880/api/user/login/',
      data: valTab
    })
      .then((response) => {
        console.log('response ok: ', response)
        if (response.data.success === 'login') {
          window.alert('login success')
        }
        // this.setState({ redirect: response.data.docInfo.redirectTo })
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  render () {
    return (
      <div className='signinWrapper'>
        <form
          className='signinForm'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >

          <ul>
            <li>Login / mail</li>
            <input
              // autoComplete='Your login'
              type='text'
              name='Login'
              onChange={ (e) => this.formHandleChange(e, 'login') }
              required='yes'
              value={this.state.Login}
            ></input>

            <li>Password</li>
            <input
              autoComplete='blabla'
              type='password'
              name="Password"
              onChange={ (e) => this.formHandleChange(e, 'password') }
              required='yes'
              value={this.state.Password}
            ></input>

            <button
              type="submit"
              value="submit"
            >login</button>
          </ul>
        </form>
      </div>
    )
  }
}
