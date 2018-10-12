
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// COMPONENT
import ProfileUserInfoPanel from '../components/ProfileUserInfoPanel/ProfileUserInfoPanel.jsx'
import ProfilePicManager from '../components/ProfilePicManager/ProfilePicManager.jsx'
import ProfileHero from '../components/ProfilePresInfos/ProfileHero.jsx'
import ProfilePersonalInfo from '../components/ProfilePresInfos/ProfilePersonalInfo.jsx'
import ProfileUserTag from '../components/ProfileUserTagManager/ProfileUserTag.jsx'
import ProfileDescriptionManager from '../components/ProfileDescriptionManager/ProfileDescriptionManager.jsx'

// CSS
import './Profile.scss'
/* eslint-enable no-unused-vars */

class Profile extends Component {
  state = {
    ActiveComponent: 'Description'
  }

  handleActiveCompChange = (event, value) => {
    this.setState({
      ActiveComponent: value
    })
  }

  componentWillMount () {
    // console.log('%c Profile component will mount', 'color: ;', this)
    this.props.userContext.getUserInfos()
  }

  render () {
    // console.log('%c profile component render', 'color: ;', this)
    if (this.props.userContext.uid === -1) {
      return (
        // window.alert('not allowed')
        window.location.replace('/')
      )
    }

    return (
      <div className='section' id='profileWrapper'>
        <ProfileHero
          userContext={this.props.userContext}
          activeComp={this.state.ActiveComponent}
          handleActiveCompChange={this.handleActiveCompChange}
        ></ProfileHero>

        <div className='columns'>

          <div className='column'>
            {
              this.state.ActiveComponent === 'InfoPerso' &&
              <ProfilePersonalInfo
                userContext={this.props.userContext}>
              </ProfilePersonalInfo>
            }

            {
              this.state.ActiveComponent === 'Hobby' &&
              <ProfileUserTag
                userContext={this.props.userContext}>
              </ProfileUserTag>
            }

            {
              this.state.ActiveComponent === 'Description' &&
              <ProfileDescriptionManager
                userContext={this.props.userContext}>
              </ProfileDescriptionManager>
            }

            {
              this.state.ActiveComponent === 'Photo' &&
              <ProfilePicManager
                userContext={this.props.userContext}>
              </ProfilePicManager>
            }
          </div>

        </div>

        {/* <div className='column is-4'>
          <ProfileUserInfoPanel userContext={this.props.userContext} userData={this.state.userData}/>
        </div> */}

      </div>
    )
  }
}

export default Profile
