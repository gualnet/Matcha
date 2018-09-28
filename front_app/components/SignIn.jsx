/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

/* eslint-enable no-unused-vars */
import Axios from 'axios'

export default class SignInForm extends Component {
  constructor () {
    super()
    this.state = {
      // real local state
      visibility: 'is-invisible',

      // compte enregistrer pour les tests
      Login: '',
      Password: ''
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

    Axios({
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
          console.log('newUid & newToken: ', newUid, newToken)
          this.props.userContext.setState({
            uid: newUid,
            token: newToken
          })
        }
        // this.setState({ redirect: response.data.docInfo.redirectTo })
        window.location.replace('/profile')
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  render () {
    return (
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
                    required='yes'
                    // value={this.state.Login}
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
                    required='yes'
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
    )
  }
}
