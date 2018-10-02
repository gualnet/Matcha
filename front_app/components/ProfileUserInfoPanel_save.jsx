/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// css
import { css } from '../assets/scss/components/ProfileUserInfoPanel.scss'
/* eslint-enable no-unused-vars */
import Axios from 'axios'

export default class ProfileUserInfoPanel extends Component {
  constructor () {
    super()
    this.state = {
      component: {
        pendingModification: false
        // checkAttrGender: this.setRadioButton('gender')
        // checkAttrOrientation: [false, false, false, false, false],
        // checkAttrGeoloc: [false, false]
      },
      userData: {
      }
    }
  }

  print (...msg) {
    console.log('\nInfo Panel: ' + msg)
  }

  /* eslint-disable */ //!
  // to set the radio buttons before render
  setRadioButton (type, num = -1) {
    // console.log('CALL setRadioButton-->', type, num)
    console.log('Info Panel setRadioButton-->', this.state)
    if (
      (typeof this.state === 'undefined') ||
      (typeof this.state.userData === 'undefined')) {
        return (false)
    }
    console.log('TEST-->', this.state.userData)
    if ((typeof this.state !== 'undefined') && type === 'gender') {
      if (this.state.userData.Gender > 0 && this.state.userData.Gender < 3
        && this.state.userData.Gender === num) {
          console.log('Info Panel setRadioButton-->', type, num, 'return true')
          return (true)
      }
      console.log('Info Panel setRadioButton-->', type, num, 'return false')
      return (false)
    }
  }

  genderSelector (event) {
    // console.log('gender selector1: ', event.target.value)
    let value = -1
    // let check = [false, false, false]
    if (event.target.value === 'male') {
      value = 1
    } else if (event.target.value === 'female') {
      value = 2
    } else if (event.target.value === 'genderqueer') {
      value = 3
    }
    if (value > 3 || value < 1) {
      return false
    }

    // check[value - 1] = true
    let newState = this.state
    newState.component.pendingModification = true
    // newState.component.checkAttrGender = check
    newState.userData.Gender = value
    this.setState({ ...newState })
  }

  orientationSelector (event) {
    // console.log('orientation selector1: ', event.target.value)
    let value = -1
    if (event.target.value === 'Heterosex') {
      value = 1
    } else if (event.target.value === 'Bisex') {
      value = 2
    } else if (event.target.value === 'Homosex') {
      value = 3
    } else if (event.target.value === 'Pansex') {
      value = 4
    } else if (event.target.value === 'Asex') {
      value = 5
    }
    if (value > 5 || value < 1) {
      return false
    }

    /*
    ** je recupere le tableau d'etat de mes boutons radio
    ** je le reset
    ** et repasse le bouton selectionne a true
    */
    let checked = [false, false, false, false, false]
    checked[value - 1] = true
    let newState = this.state
    newState.component.pendingModification = true
    newState.component.checkAttrOrientation = checked
    newState.userData.Orientation = value
    this.setState({ ...newState })
  }

  geolocAuthSelector (event) {
    console.log('geoloc selector1: ', this.state)
    let value = true
    let checked = [true, false]
    if (event.target.value === 'false') {
      value = false
      checked = [false, true]
    }

    let newState = this.state
    newState.component.pendingModification = true
    newState.component.checkAttrGeoloc = checked
    newState.userData.GeolocAuth = value
    this.setState({ ...newState })
  }

  handleModifs (event, fieldName) {
    // console.log('event: ', event)
    // console.log('event.target: ', event.target)
    let value = event.target.value

    if (fieldName === 'Age') {
      value = Number(value)
      console.log('value: ', value)
      let ageInput = document.getElementById('ageInput')
      if (Number.isNaN(value) || value < 15 || value > 111) {
        ageInput.setAttribute('class', `input is-small is-danger`)
      } else {
        let newAttr = ageInput.getAttribute('class').replace(' is-danger', '')
        console.log('newAttr: ', newAttr)
        ageInput.setAttribute('class', `${newAttr}`)
      }
    }

    let setter = this.state.userData
    setter[fieldName] = event.target.value
    let newState = this.state
    newState.component.pendingModification = true
    newState.userData = setter
    this.setState({ ...newState })
  }

  updateRequest (event) {
    event.preventDefault()
    if (!this.state.component.pendingModification) {
      console.log('No modification has been detected')
      return
    }
    console.log('MOOOOOOODIFFFFFFFFF')
    let dataToSend = {
      ...this.state,
      token: this.props.userContext.token
    }
    delete dataToSend.checkAttrGender
    delete dataToSend.checkAttrOrientation
    delete dataToSend.checkAttrGeoloc
    delete dataToSend.pendingModification
    // console.log('dataToSend: ', dataToSend)
    Axios({
      method: 'PUT',
      // url: `http://localhost:8880/api/user/profil/${this.props.userContext.uid}/${this.props.userContext.token}`,
      url: `http://localhost:8880/api/user/profil`,
      data: dataToSend
    }).then((response) => {
      console.log('Response', response)
      if (response.data.success) {
        window.alert('success: ', response.data.success)
        this.setState({
          component: {
            ...this.state.component,
            pendingModification: false
          },
          userData: {
            ...response.data.userState
          }
        })
        // this.props.userContext.setState({
        //   token: response.data.userState.token
        // })
      } else if (response.data.error) {
        window.alert('success: ', response.data.success)
      }
    }).catch((error) => {
      console.error('Error: Axios request failed', error)
    })
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
    console.log('Infon Panel RENDER-->', this.state)
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
          <input className='input is-small'
            defaultValue={this.state.userData.Mail}
            onChange={(e) => this.handleModifs(e, 'Mail')}
          />
        </div>
        <label className='label'>Gender</label>
        <div className='panel-block'>
          <label className='radio'>
            <input id='radioGender1' type='radio' name='gender' value='male'
              onChange={(event) => this.genderSelector(event)}
              checked={this.setRadioButton('gender', 0)}
            /> Male
          </label>
          <label className='radio'>
            <input id='radioGender2' type='radio' name='gender' value='female'
              onChange={(event) => this.genderSelector(event)}
              checked={this.setRadioButton('gender', 1)}
            /> Female
          </label>
          <label className='radio'>
            <input id='radioGender3' type='radio' name='gender' value='genderqueer'
              onChange={(event) => this.genderSelector(event)}
              checked={this.setRadioButton('gender', 2)}
            /> Genderqueer
          </label>
        </div>
        <label className='label'>Orientation</label>
        {/* <div className='panel-block'>
          <label className='radio'>
            <input type='radio' name='orientation'
              value='Heterosex'
              onChange={(event) => this.orientationSelector(event)}
              checked={this.state.component.checkAttrOrientation[0]} /> Heterosex
          </label>
          <label className='radio'>
            <input type='radio' name='orientation'
              value='Bisex'
              onChange={(event) => this.orientationSelector(event)}
              checked={this.state.component.checkAttrOrientation[1]} /> Bisex
          </label>
          <label className='radio'>
            <input type='radio' name='orientation'
              value='Homosex'
              onChange={(event) => this.orientationSelector(event)}
              checked={this.state.component.checkAttrOrientation[2]} /> Homosex
          </label>
          <label className='radio'>
            <input type='radio' name='orientation'
              value='Pansex'
              onChange={(event) => this.orientationSelector(event)}
              checked={this.state.component.checkAttrOrientation[3]} /> Pansex
          </label>
          <label className='radio'>
            <input type='radio' name='orientation'
              value='Asex'
              onChange={(event) => this.orientationSelector(event)}
              checked={this.state.component.checkAttrOrientation[4]} /> Asex
          </label>
        </div> */}
        <label className='label'>Bio</label>
        <div className='panel-block'>

          <textarea className='textarea is-small'
            value={this.state.userData.Bio}
            onChange={(e) => this.handleModifs(e, 'Bio')}
          ></textarea>

        </div>
        <label className='label'>GeolocAuth</label>
        {/* <div className='panel-block'>
          <label className='radio'>
            <input type='radio' name='geolocAuth' value='true'
              onChange={(event) => this.geolocAuthSelector(event)}
              checked={this.state.component.checkAttrGeoloc[0]} /> 👍
          </label>
          <label className='radio'>
            <input type='radio' name='geolocAuth' value='false'
              onChange={(event) => this.geolocAuthSelector(event)}
              checked={this.state.component.checkAttrGeoloc[1]} /> 🖕
          </label>
        </div> */}
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
