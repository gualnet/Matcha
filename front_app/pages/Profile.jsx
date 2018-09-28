
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// component
import ProfileUserInfoPanel from '../components/ProfileUserInfoPanel.jsx'

// css
import { css } from '../assets/scss/pages/Profile.scss'
import Axios from 'axios'
/* eslint-enable no-unused-vars */

// const Profile = () => {
class Profile extends Component {
  constructor () {
    super()
    this.state = {
      userState: {}
    }
  }
  // !dev
  print (...msg) {
    console.log('\nProfile component : ' + msg)
  }
  // dev

  populateUserState () {
    // console.log('populateUserState: ', this.props.userContext)
    Axios({
      method: 'GET',
      url: `http://localhost:8880/api/user/profil/${this.props.userContext.uid}/${this.props.userContext.token}`,
      data: { ...this.userContext }
    }).then((axiosRsp) => {
      console.log('axiosRsp: ', axiosRsp)
      if (axiosRsp.data.success) {
        this.setState({
          userState: { ...axiosRsp.data.userData }
        })
      }
    }).catch((error) => {
      console.log('Profile error: ', error)
      window.location.assign('/')
    })
  }

  componentWillMount () {
    // console.log('Profile component will mount')
    this.populateUserState()
  }

  render () {
    console.log('profile component render', this.state)
    console.log('profile component render', this.props)
    return (
      <div className='section' id='profileWrapper'>
        <div className='columns is-centered'>
          <div className='column is-one-third is-offset-1'>
            <div className='bd-notification is-primary'>
              <figure className='image is-128x128'>

                <img className='is-rounded' src='https://images.unsplash.com/photo-1506357997910-c76d3e4d3ecf?ixlib=rb-0.3.5&s=3355befb40b2c272634910fb5f80ad75&auto=format&fit=crop&w=1650&q=80'></img>

              </figure>
              Global Score
            </div>
          </div>
          <div className='column'>
            RIEN ICI
          </div>
        </div>

        <div className='container' id='profileBody'>
          <div className='columns'>
            <div className='column is-4'>
              <ProfileUserInfoPanel userContext={this.props.userContext} userState={this.state.userState}/>
            </div>

            <div className='column is-4 is-offset-3'>
              // component pour la gestion des photos
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Profile
