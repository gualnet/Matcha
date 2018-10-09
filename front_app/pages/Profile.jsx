
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// component
import ProfileUserInfoPanel from '../components/ProfileUserInfoPanel/ProfileUserInfoPanel.jsx'
import ProfilePicManager from '../components/ProfilePicManager/ProfilePicManager.jsx'
import ProfileTopInfoLeft from '../components/ProfileTopInfo/ProfileTopInfoLeft.jsx'
import ProfileTopInfoRight from '../components/ProfileTopInfo/ProfileTopInfoRight.jsx'
import ProfileUserTag from '../components/ProfileUserTagManager/ProfileUserTag.jsx'

// css
import './Profile.scss'
/* eslint-enable no-unused-vars */

class Profile extends Component {
  componentWillMount () {
    // console.log('%c Profile component will mount', 'color: ;', this)
    this.props.userContext.getUserInfos()
  }

  /* eslint-disable */
  render () {
    // console.log('%c profile component render', 'color: blue;', this)
    if (this.props.userContext.uid === -1) {
      return (
        // window.alert('not allowed')
        window.location.replace('/')
      )
    }

    return (
      <div className='section' id='profileWrapper'>

        <div className='columns is-centered' id="topInfoWrapper">
            <ProfileTopInfoLeft
              userContext={this.props.userContext}
            ></ProfileTopInfoLeft>

            <ProfileTopInfoRight
              userContext={this.props.userContext}
            ></ProfileTopInfoRight>
        </div>

        <div className='container' id='profileBody'>

          <div className='columns'>
            <div className='column is-4'>
              <ProfilePicManager
                userContext={this.props.userContext}>
              </ProfilePicManager>
            </div>
            {/* <div className='column is-4'>
              <ProfileUserInfoPanel userContext={this.props.userContext} userData={this.state.userData}/>
            </div> */}
            <div className='column is-4 is-offset-3'>
              <ProfileUserTag
                userContext={this.props.userContext}>
              </ProfileUserTag>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Profile
