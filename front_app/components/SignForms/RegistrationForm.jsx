/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// CSS
import './RegistrationForm.scss'
import axios from 'axios'
/* eslint-enable no-unused-vars */

/* eslint-disable */
class RegistrationForm extends Component {
  state = {
    step: 1,
    FirstName: '',
    LastName: '',
    Age: 0,
    Login: '',
    Mail: '',
    Password: ''
  }

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
        this.checkLoginValidity(value)
        this.setState({ Login: value })
        break
      case 'firstName':
        this.setState({ FirstName: value })
        break
      case 'lastName':
        this.setState({ LastName: value })
        break
      case 'age':
        console.log(this.state.Age, 'change', value, Number(value), !isNaN(Number(value)))
        if (!isNaN(Number(value))) {
          this.setState({ Age: Number(value) })
        }
        break
      case 'mail':
        this.setState({ Mail: value })
        break
      case 'password':
        this.setState({ Password: value })
        break
    }
  }

  checkLoginValidity = (value) => {
    axios({
      method: 'post',
      url: '/api/user/checklogin',
      data: { Login: value }
    })
      .then((response) => {
        // console.log('response', response.data.result)
        console.log('response', response.data.result.ret)
        this.setLoginIndicator(response.data.result.ret)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  setLoginIndicator = (val) => {
    const elem = document.getElementById('loginIndicator')
    if (!elem) {
      return
    }
    if (this.state.Login.length <= 2) {
      elem.className = 'indicator'
    } else if (val && this.state.Login.length > 2) {
      elem.className = 'indicatorOk'
    } else if (!val && this.state.Login.length > 2) {
      elem.className = 'indicatorNok'
    }
  }

  nextStep = (event) => {
    console.log('nextStep')
    var err = 0
    if (this.state.step === 1) {
      if (this.state.FirstName.length === 0) {
        // console.log('...')
        err += 1
        const elem = document.getElementById('inputRegFirstName')
        elem.style.border = '1px solid red'
        elem.style.backgroundColor = 'rgba(255, 0, 0, 0.15)'
        setTimeout(() => { elem.style.border = '' }, 3000)
        setTimeout(() => { elem.style.backgroundColor = '' }, 3000)
      }
      if (this.state.LastName.length === 0) {
        // console.log('...')
        err += 1
        const elem = document.getElementById('inputRegLastName')
        elem.style.border = '1px solid red'
        elem.style.backgroundColor = 'rgba(255, 0, 0, 0.15)'
        setTimeout(() => { elem.style.border = '' }, 4000)
        setTimeout(() => { elem.style.backgroundColor = '' }, 4000)
      }
      if (this.state.Age < 18 || this.state.Age > 120) {
        // console.log('AGE ', this.state.Age)
        err += 1
        const elem = document.getElementById('inputRegAge')
        elem.style.border = '1px solid red'
        elem.style.backgroundColor = 'rgba(255, 0, 0, 0.15)'
        setTimeout(() => { elem.style.border = '' }, 5000)
        setTimeout(() => { elem.style.backgroundColor = '' }, 5000)
      }
      if (err === 0) {
        this.setState({ step: 2 })
      }
    }
  }

  submitRegistration = () => {
    const dataToSend = this.state

    axios({
      method: 'post',
      url: '/api/user/register/',
      data: dataToSend
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

  render () {
    console.log('registration form RENDER')
    return (
      <div className='container has-text-centered' id='registrationFormWrapper'>

        <div id='formBody'>
          <h5 className='title is-5'>New account: {this.state.step}</h5>
          {this.state.step === 1 && this.formStep1()}
          {this.state.step === 2 && this.formStep2()}
        </div>
        {/* <div id='formFooter'>
        footer
        </div> */}

      </div>
    )
  }

  formStep1 = () => {
    return (
      <div id='step1Wrapper'>

        <div className='field'>
          <div className='control'>
            <input required className='input' type='text' id='inputRegFirstName' placeholder='FirstName' onChange={(e) => this.formHandleChange(e, 'firstName')}/>
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input required className='input' type='text' id='inputRegLastName' placeholder='LastName' onChange={(e) => this.formHandleChange(e, 'lastName')}/>
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input required className='input' type='text' id='inputRegAge' 
            placeholder='Age'
            value={ (this.state.Age > 0) ? this.state.Age : ''}
            onChange={(e) => this.formHandleChange(e, 'age')}/>
          </div>
        </div>

        <button className='button is-link' id='btnNext' onClick={this.nextStep}>Next >></button>

      </div>
    )
  }

  formStep2 = () => {
    return (
      <div id='step1Wrapper'>

        <div className='field'>
          <div className='control'>
            <input required className='input' type='text' id='inputRegLogin' placeholder='Login' onChange={(e) => this.formHandleChange(e, 'login')}/>

            <div className='indicator' id='loginIndicator'></div>

          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input required className='input' type='text' id='inputRegMail' placeholder='Mail' onChange={(e) => this.formHandleChange(e, 'mail')}/>
          </div>
        </div>

        <div className='field'>
          <div className='control'>
            <input required className='input' type='password' id='inputRegPassword' placeholder='Password' onChange={(e) => this.formHandleChange(e, 'password')}/>
          </div>
        </div>

        <button className='button is-link' id='btnNext' onClick={this.submitRegistration}>Register ></button>

      </div>
    )
  }

}

export default RegistrationForm
