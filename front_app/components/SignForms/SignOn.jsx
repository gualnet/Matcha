/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import MsgPop from '../MsgPop/MsgPop.jsx'

// CSS
import './SignOn.scss'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignOnForm extends Component {
  constructor () {
    super()
    this.state = {
      // compte enregistrer pour les tests
      Login: 'test00',
      FirstName: '00',
      LastName: 'test',
      Mail: 'test11@mail.fr',
      Password: 'qwertyuiop00'
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

    const valTab = this.state

    axios({
      method: 'post',
      url: 'http://localhost:8880/api/user/register/',
      data: valTab
    })
      .then((response) => {
        console.log('%c response ok: ', 'color: cyan', response)
        if (response.data.success === 'registration') {
          window.alert('New user registered')
        } else {
          // window.alert('Error while register')
          this.handleSubmitError(response.data)
        }
        // this.setState({ redirect: response.data.docInfo.redirectTo })
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  /* eslint-disable */
  handleSubmitError = (rspData) => {
    // console.log('handleSubmitError', rspData)
    const msg = String(rspData.msg)
    // console.log('msg', msg)
    // console.log('msg', msg.indexOf('verif'))

    if (msg.indexOf('verif') !== -1) {
      const {verifLogin, verifMail, verifPassword, verifFirstName, verifLastName} = { ...rspData.result }
      console.log('----------------------')
      console.log('test:', {verifLogin, verifMail, verifPassword, verifFirstName, verifLastName})
      if (!verifLogin) {
        const elem = document.getElementsByName('login')[0]
        elem.style.border = '1px solid red'
        setTimeout(() => { elem.style.border = 'none' }, 5000)
        MsgPop.showPopup({ id: 'popErrLogin' })
      }
      if (!verifPassword) {
        const elem = document.getElementsByName('password')[0]
        elem.style.border = '1px solid red'
        setTimeout(() => { elem.style.border = 'none' }, 5000)
        MsgPop.showPopup({ id: 'popErrPassword' })
      }
      if (!verifMail) {
        const elem = document.getElementsByName('mail')[0]
        elem.style.border = '1px solid red'
        setTimeout(() => { elem.style.border = 'none' }, 5000)
        MsgPop.showPopup({ id: 'popErrMail' })
      }
    }
    if (msg.indexOf('used') !== -1) {
      if (rspData.result.login) {
        const elem = document.getElementsByName('login')[0]
        elem.style.border = '1px solid red'
        setTimeout(() => { elem.style.border = 'none' }, 5000)
        MsgPop.showPopup({ id: 'popUsedLogin' })
      }
      if (rspData.result.mail) {
        const elem = document.getElementsByName('mail')[0]
        elem.style.border = '1px solid red'
        setTimeout(() => { elem.style.border = 'none' }, 5000)
        MsgPop.showPopup({ id: 'popUsedMail' })
      }
    }
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
      <div className='signOnWrapper'>
          <MsgPop
          id='popErrPassword'
          level='warning'
          message='Password must be 8 chars and contain 2 num'
        />
        <MsgPop
          id='popErrLogin'
          level='warning'
          message='Login must contain between 2 and 25 chars'
        />
        <MsgPop
          id='popErrMail'
          level='warning'
          message='Mail not well formated'
        />
        <MsgPop
          id='popUsedLogin'
          level='warning'
          message='This login is already used'
        />
        <MsgPop
          id='popUsedMail'
          level='warning'
          message='This email is already used'
        />

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
                  <button id='signonSubmitBtn'
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
