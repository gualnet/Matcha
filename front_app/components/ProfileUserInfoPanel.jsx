/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

/* eslint-enable no-unused-vars */
import JWT from 'jsonwebtoken'

export default class ProfileUserInfoPanel extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  decodeUserInfo = () => {
    return JWT.decode(this.props.userContext.token)
  }

  makeModif = (event) => {
    event.preventDefault()
  }

  componentDidMount () {
    const payload = this.decodeUserInfo()
    this.setState({ ...payload })
  }

  genderSelector (event) {
    console.log('gender selector1: ', event.target.value)
    let value = -1
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
    this.setState({ Gender: event.target.value })
  }

  orientationSelector (event) {

  }

  geolocAuthSelector (event) {

  }

  updateRequest () {
    // TODO ... 😴
  }

  render () {
    // console.log('-->', this.state)
    return (
      <div className='panel'>
        <p className='panel-heading'>
          {this.state.Login} - {`${this.state.Popularity} pts`}
        </p>
        <label className='label'>FirstName: </label>
        <div className='panel-block'>
          <p className='input is-small'>{this.state.FirstName}</p>
        </div>
        <label className='label'>LastName</label>
        <div className='panel-block'>
          <p className='input'>{this.state.LastName}</p>
        </div>
        <label className='label'>Mail</label>
        <div className='panel-block'>
          <p className='input'>{this.state.Mail}</p>
        </div>
        <label className='label'>Gender</label>
        <div className='panel-block'>
          <label className='radio'
            onChange={(event) => this.genderSelector(event)}>
            <input type='radio' name='gender' value='male' /> Male
          </label>
          <label className='radio'
            onChange={(event) => this.genderSelector(event)}>
            <input type='radio' name='gender' value='female' /> Female
          </label>
          <label className='radio'
            onChange={(event) => this.genderSelector(event)}>
            <input type='radio' name='gender' value='genderqueer' /> Genderqueer
          </label>
        </div>
        <label className='label'>Orientation</label>
        <div className='panel-block'>
          <label className='radio'
            onChange={(event) => this.orientationSelector(event)}>
            <input type='radio' name='orientation'
              value='Heterosex' /> Heterosex
          </label>
          <label className='radio'
            onChange={(event) => this.orientationSelector(event)}>
            <input type='radio' name='orientation'
              value='Bisex' /> Bisex
          </label>
          <label className='radio'
            onChange={(event) => this.orientationSelector(event)}>
            <input type='radio' name='orientation'
              value='Homosex' /> Homosex
          </label>
          <label className='radio'
            onChange={(event) => this.orientationSelector(event)}>
            <input type='radio' name='orientation'
              value='Pansex' /> Pansex
          </label>
          <label className='radio'
            onChange={(event) => this.orientationSelector(event)}>
            <input type='radio' name='orientation'
              value='Asex' /> Asex
          </label>
        </div>
        <label className='label'>Bio</label>
        <div className='panel-block'>
          <p className='input'>{this.state.Bio}</p>
        </div>
        <label className='label'>GeolocAuth</label>
        <div className='panel-block'>
          <label className='radio'
            onChange={(event) => this.geolocAuthSelector(event)}>
            <input type='radio' name='geolocAuth' value='ok' /> 👍
          </label>
          <label className='radio'
            onChange={(event) => this.geolocAuthSelector(event)}>
            <input type='radio' name='geolocAuth' value='nok' /> 🖕
          </label>
        </div>
        <div className='panel-block'>
          <button
            id='profileUserPanelBtn'
            className='button is-small is-dark is-outlined'
            onClick={(e) => this.makeModif(e)}
          >Modif</button>
        </div>
      </div>
    )
  }
}
