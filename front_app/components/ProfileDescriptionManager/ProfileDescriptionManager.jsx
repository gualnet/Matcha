
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// CSS
import './ProfileDescriptionManager.scss'
/* eslint-enable no-unused-vars */

class ProfileDescriptionManager extends Component {
  constructor () {
    super()
    this.state = {
      HeightValue: 1.30,
      WeightValue: 20,
      EyeColor: 0,
      EyeColorChoice: ['Blue', 'Brown', 'Grey', 'Green'],
      HairColor: 0,
      HairColorChoice: ['Blond', 'Black', 'Dark Blond', 'Grey', 'Ginger', 'Other'],
      saveDisabled: true
    }
  }

  /* eslint-disable */
  sendChanges = async () => {
    let dataToSend = {
      token: this.props.userContext.token,
      userData: {
        Height: this.state.HeightValue,
        Weight: this.state.WeightValue,
        EyeColor: this.state.EyeColor,
        HairColor: this.state.HairColor
      }
    }
    console.log('%c dataToSend: ', 'color: green;', { dataToSend })
    try {
      let response = await window.fetch(`/api/user/profil`, {
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

        this.setState({
          saveDisabled: true
        })
        this.props.userContext.getUserInfos()
      } else {
        console.log('Server Response Error: ',
          response.status, ' - ', response.statusText)
      }
    } catch (error) {
      console.log('Error fetch request: ', error)
    }
  }

  setHeight = (event) => {
    // console.log('height test: ', event.target.value)
    const num = Number.parseFloat(event.target.value).toPrecision(3)
    this.setState({
      HeightValue: Number(num).toPrecision(3)
    })
    this.toggleSaveButton()
  }

  setWeight = (event) => {
    // console.log('height test: ', event.target.value)
    const num = Number.parseFloat(event.target.value)
    if (num < 100) {
      num.toPrecision(2)
    } else {
      num.toPrecision(3)
    }
    this.setState({
      WeightValue: Number(num)
    })
    this.toggleSaveButton()
  }

  handleRadioChange = (event) => {
    // console.log('%c handleRadioChange: ', 'color: red;', event)
    const splited = event._targetInst.key.split('_')
    const type = splited[0]
    const key = Number(splited[1])

    // console.log('%c handleRadioChange: ', 'color: red;', type)
    // console.log('%c handleRadioChange: ', 'color: orange;', key)
    if (type === 'eye') {
      this.setState({
        EyeColor: key
      })
    } else if (type === 'hair') {
      this.setState({
        HairColor: key
      })
    }
    this.toggleSaveButton()
  }

  radioIsChecked (elem, key) {
    // console.log('%c isChecked: ', 'color: ;', typeof elem, typeof key)
    // console.log('%c isChecked: ', 'color: ;', this.state.EyeColor, this.state.HairColor)
    if (elem === 'eye' && Number(key) === this.state.EyeColor) {
      return ('checked')
    } else if (elem === 'eye') {
      return ('')
    }
    if (elem === 'hair' && Number(key) === this.state.HairColor) {
      return ('checked')
    } else if (elem === 'hair') {
      return ('')
    }
    console.log('return ???')
    return ('?')
  }

  radioFactory (choice, type) {
    let factoArr = []

    for (let key in choice) {
      factoArr.push(
        <li className='field' key={key}>
          <input className='is-checkradio' id=''
            type='checkbox'
            key={`${type}_${key}`}
            checked={this.radioIsChecked(`${type}`, `${key}`)}
            onChange={this.handleRadioChange}/>
          <label>{`${choice[key]}`}</label>
        </li>
      )
    }
    return factoArr
  }

  saveBtnFactory = () => {
    if (this.state.saveDisabled) {
      return (
        <a className='button is-success' id='saveBtn' disabled>
          <span className="icon is-small">
            <i className="fas fa-check"></i>
          </span>
          <span>Save</span>
        </a>
      )
    } else {
      return (
        <a className='button is-success'
          id='saveBtn'
          onClick={this.sendChanges}>
          <span className="icon is-small">
            <i className="fas fa-check"></i>
          </span>
          <span>Save</span>
        </a>
      )
    }
  }

  // switch enable / disable save button
  toggleSaveButton = () => {
    if (this.state.saveDisabled) {
      this.setState({
        saveDisabled: !this.state.saveDisabled
      })
    }
  }

  // componentWillUpdate () {
  //   console.log('ProfileDescriptionManager component will update')
  //   const usrCtx = this.props.userContext

  //   this.setState({
  //     HeightValue: usrCtx.userData.Height,
  //     WeightValue: usrCtx.userData.Weight,
  //     EyeColor: usrCtx.userData.EyeColor,
  //     HairColor: usrCtx.userData.HairColor
  //   })
  // }
  componentWillMount () {
    console.log('%c ProfileDescriptionManager component will mount', 'color: red;')
    const usrCtx = this.props.userContext

    // this.setState({
    //   HeightValue: usrCtx.userData.Height,
    //   WeightValue: usrCtx.userData.Weight,
    //   EyeColor: usrCtx.userData.EyeColor,
    //   HairColor: usrCtx.userData.HairColor
    // })
  }

  componentDidMount () {
    console.log('%c ProfileDescriptionManager component did mount', 'color: red;')
    const usrCtx = this.props.userContext

    this.setState({
      HeightValue: usrCtx.userData.Height,
      WeightValue: usrCtx.userData.Weight,
      EyeColor: usrCtx.userData.EyeColor,
      HairColor: usrCtx.userData.HairColor
    })
  }

  render () {
    console.log('%c ProfileDescriptionManager RENDER ', 'color: green;', { ...this.state })
    console.log('%c ProfileDescriptionManager RENDER ', 'color: orange;', { ...this.props })
    return (
      <div className='container' id='ProfileDescriptionManagerWrapper'>
        <div className='container'>
          <div>Height:
            <a>{`${this.state.HeightValue}`} m</a>
            <input className='slider has-output'
              step='0.05' min='1.30' max='2.20'
              defaultValue={this.props.userContext.userData.Height} type='range'
              onChange={this.setHeight}>
            </input>
          </div>

          <div>Weight:
            <a>{`${this.state.WeightValue}`} Kg</a>
            <input className='slider has-output'
              step='5' min='20' max='120'
              defaultValue={this.props.userContext.userData.Weight} type='range'
              onChange={this.setWeight}>
            </input>
          </div>

          <div>Eyes color:
            <ul>
              {this.radioFactory(this.state.EyeColorChoice, 'eye')}
            </ul>
          </div>

          <div>Hair color:
            <ul>
              {this.radioFactory(this.state.HairColorChoice, 'hair')}
            </ul>
          </div>

          <div>
              {this.saveBtnFactory()}
          </div>

        </div>
      </div>
    )
  }
}

export default ProfileDescriptionManager
