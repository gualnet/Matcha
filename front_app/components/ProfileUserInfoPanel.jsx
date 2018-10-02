/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// css
import { css } from '../assets/scss/components/ProfileUserInfoPanel.scss'
/* eslint-enable no-unused-vars */

export default class ProfileUserInfoPanel extends Component {
  constructor () {
    super()
    this.state = {
      component: {
        pendingModification: false
      },
      userData: {
      }
    }
  }

  print (...msg) {
    console.log('\nInfo Panel: ' + msg)
  }

  getGenderName () {
    switch (this.state.userData.Gender) {
      case 0:
        return 'Male'
      case 1:
        return 'Female'
      case 2:
        return 'Genderqueer'
      default:
        return 'Unknown'
    }
  }

  setGender (event) {
    // console.log('SET GENDER: ', event.target.value)
    let value = -1
    switch (event.target.value) {
      case 'Queergender':
        value = 2
        break
      case 'Male':
        value = 0
        break
      case 'Female':
        value = 1
        break
      default:
        document.getElementById('selectGender').setAttribute('class', 'select is-small is-danger')
        return
    }
    if (value !== -1) {
      document.getElementById('selectGender').setAttribute('class', 'select is-small is-success')
    }
    console.log(value)
    this.setState({
      ...this.state,
      component: {
        pendingModification: true
      },
      userData: {
        ...this.state.userData,
        Gender: value
      }
    })
  }

  getOrientationName () {
    switch (this.state.userData.Orientation) {
      case 0:
        return 'Heterosex'
      case 1:
        return 'Bisex'
      case 2:
        return 'Homosex'
      case 3:
        return 'Pansex'
      case 4:
        return 'Asex'
      default:
        return 'Unknown'
    }
  }

  setOrientation (event) {
    // console.log('SET ORIENTATION: ', event.target.value)
    let value = -1
    switch (event.target.value) {
      case 'Heterosex':
        value = 0
        break
      case 'Bisex':
        value = 1
        break
      case 'Homosex':
        value = 2
        break
      case 'Pansex':
        value = 3
        break
      case 'Asex':
        value = 4
        break
      default:
        document.getElementById('selectOrientation').setAttribute('class', 'select is-small is-danger')
        return
    }
    if (value !== -1) {
      document.getElementById('selectOrientation').setAttribute('class', 'select is-small is-success')
    }
    console.log(value)
    this.setState({
      ...this.state,
      component: {
        pendingModification: true
      },
      userData: {
        ...this.state.userData,
        Orientation: value
      }
    })
  }

  getGeolocAuthName () {
    // console.log('GeolocAuth status: ', this.state.userData.GeolocAuth)
    switch (this.state.userData.GeolocAuth) {
      case 1:
        return '✅'
      case 0:
        return '❌'
      default:
        return 'Unknown'
    }
  }

  setGeolocAuth (event) {
    // console.log('SET GEALOCAUTH: ', event.target.value)
    let value = -1
    switch (event.target.value) {
      case '✅':
        value = 1
        break
      case '❌':
        value = 0
        break
      default:
        document.getElementById('selectGeolocAuth').setAttribute('class', 'select is-small is-danger')
        return
    }
    if (value !== -1) {
      document.getElementById('selectGeolocAuth').setAttribute('class', 'select is-small is-success')
    }
    console.log('Setting value:', value)
    this.setState({
      ...this.state,
      component: {
        pendingModification: true
      },
      userData: {
        ...this.state.userData,
        GeolocAuth: value
      }
    })
  }

  handleModifs (event, fieldName) {
    // console.log('event: ', event)
    // console.log('event.target: ', event.target)
    let value = event.target.value

    if (fieldName === 'Age') {
      value = Number(value)
      console.log('value: ', value)
      const ageInput = document.getElementById('ageInput')
      if (Number.isNaN(value) || value < 15 || value > 111) {
        ageInput.setAttribute('class', `input is-small is-danger`)
      } else {
        const newAttr = ageInput.getAttribute('class').replace(' is-danger', '')
        console.log('newAttr: ', newAttr)
        ageInput.setAttribute('class', `${newAttr}`)
      }
    }
    if (fieldName === 'Mail') {
      const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      let mailInput = document.getElementById('mailInput')
      if (!regexMail.test(value)) {
        mailInput.setAttribute('class', `input is-small is-danger`)
      } else {
        const newAttr = mailInput.getAttribute('class').replace(' is-danger', ' is-success')
        mailInput.setAttribute('class', newAttr)
      }
    }

    let setter = this.state.userData
    setter[fieldName] = event.target.value
    let newState = this.state
    newState.component.pendingModification = true
    newState.userData = setter
    this.setState({ ...newState })
  }

  async updateRequest (event) {
    event.preventDefault()
    if (!this.state.component.pendingModification) {
      // console.log('No modification has been detected')
      return
    }
    let dataToSend = {
      ...this.state,
      token: this.props.userContext.token
    }
    delete dataToSend.checkAttrGender
    delete dataToSend.checkAttrOrientation
    delete dataToSend.checkAttrGeoloc
    delete dataToSend.pendingModification
    // console.log('dataToSend: ', dataToSend)

    try {
      let response = await window.fetch(`http://localhost:8880/api/user/profil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })

      if (response.ok) {
        console.log('response: ', response)
        let responseData = await response.json()
        console.log('responseData: ', responseData)
        window.location.reload()
      } else {
        console.log('Server Response Error: ',
          response.status, ' - ', response.statusText)
      }
    } catch (error) {
      console.log('Error fetch request: ', error)
    }
  }

  // watch la maj de props (props.userState)
  // venant du component parent (ajax request user data)
  componentDidUpdate (prevProps, prevState) {
    // console.log('TEST prevProps / this.props', prevProps, ' / ', this.props)
    if (this.props !== prevProps) {
      this.setState({
        userData: { ...this.props.userState }
      })
    }
  }

  render () {
    // console.log('Infon Panel RENDER-->', this.state)
    // console.log('RENDER-->', this.props)
    // const userData = this.state.userData
    // const component = this.state.component
    return (
      <div className='panel'>
        <p className='panel-heading'>
          {this.state.userData.Login} - {`${this.state.userData.Popularity} pts`}
        </p>
        <label className='label'>FirstName: </label>
        <div className='panel-block'>
          <input className='input is-small'
            defaultValue={this.state.userData.FirstName}
            onChange={(e) => this.handleModifs(e, 'FirstName')}
          />
        </div>
        <label className='label'>LastName</label>
        <div className='panel-block'>
          <input className='input is-small'
            defaultValue={this.state.userData.LastName}
            onChange={(e) => this.handleModifs(e, 'LastName')} />
        </div>
        <label className='label'>Age</label>
        <div className='panel-block'>
          <input className='input is-small'
            id='ageInput'
            defaultValue={this.state.userData.Age}
            onChange={(e) => this.handleModifs(e, 'Age')} />
        </div>
        <label className='label'>Mail</label>
        a faire validation cahngement de mail
        <div className='panel-block'>
          <input disabled className='input is-small'
            id='mailInput'
            defaultValue={this.state.userData.Mail}
            // onChange={(e) => this.handleModifs(e, 'Mail')}
          />
        </div>
        <label className='label'>Gender</label>
        <div className='panel-block'
          onChange={(e) => { this.setGender(e) }}
        >
          <div className="select is-small" id='selectGender'>
            <select>
              <option>{this.getGenderName()}</option>
              <option>Queergender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
        <label className='label'>Orientation</label>
        <div className='panel-block'
          onChange={(e) => { this.setOrientation(e) }}
        >
          <div className="select is-small" id='selectOrientation'>
            <select>
              <option>{this.getOrientationName()}</option>
              <option>Heterosex</option>
              <option>Bisex</option>
              <option>Homosex</option>
              <option>Pansex</option>
              <option>Asex</option>
            </select>
          </div>
        </div>

        <label className='label'>Bio</label>
        <div className='panel-block'>

          <textarea className='textarea is-small'
            value={this.state.userData.Bio}
            onChange={(e) => this.handleModifs(e, 'Bio')}
          ></textarea>

        </div>
        <label className='label'>GeolocAuth</label>
        <div className='panel-block'
          onChange={(e) => { this.setGeolocAuth(e) }}
        >
          <div className="select is-small" id='selectGeolocAuth'>
            <select>
              <option>{this.getGeolocAuthName()}</option>
              <option>✅</option>
              <option>❌</option>
            </select>
          </div>
        </div>
        <div className='panel-block'>
          <button
            id='profileUserPanelBtn'
            className='button is-small is-dark is-outlined'
            onClick={(e) => this.updateRequest(e)}
          >Modif</button>
        </div>
      </div>
    )
  }
}
