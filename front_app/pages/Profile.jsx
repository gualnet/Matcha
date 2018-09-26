
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// component
import ProfileUserInfoPanel from '../components/ProfileUserInfoPanel.jsx'

// css
import { css } from '../assets/scss/pages/Profile.scss'
/* eslint-enable no-unused-vars */

// const Profile = () => {
class Profile extends Component {
  render () {
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
              <ProfileUserInfoPanel userContext={this.props.userContext} />
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
