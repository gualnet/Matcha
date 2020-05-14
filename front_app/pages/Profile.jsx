
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { GeolocProvider, GeolocContext } from '../contexts/GeolocContext'

// COMPONENT
import ProfileUserInfoPanel from '../components/ProfileUserInfoPanel/ProfileUserInfoPanel.jsx'
import ProfilePicManager from '../components/ProfilePicManager/ProfilePicManager.jsx'
import ProfileHero from '../components/ProfileHero/ProfileHero.jsx'
import ProfilePersonalInfo from '../components/ProfilePresInfos/ProfilePersonalInfo.jsx'
import ProfileUserTag from '../components/ProfileUserTagManager/ProfileUserTag.jsx'
import ProfileDescriptionManager from '../components/ProfileDescriptionManager/ProfileDescriptionManager.jsx'
import ProfileGeolocManager from '../components/ProfileGeolocManager/ProfileGeolocManager.jsx'
import LoadingComp from '../components/LoadingComp/LoadingComp.jsx'

// CSS
import './Profile.scss'
/* eslint-enable no-unused-vars */

class Profile extends Component {
  state = {
    // ActiveComponent: 'Geoloc'
    ActiveComponent: 'InfoPerso'
  }

  handleActiveCompChange = (event, value) => {
    this.setState({
      ActiveComponent: value
    })
  }

  componentWillMount () {
    // console.log('%c Profile component will mount', 'color: blue;', this)
    this.props.userContext.getUserInfos()
    // console.log('%c test: ', 'color: cyan', this)
  }
  // async componentDidMount () {
  //   console.log('%c Profile component did mount', 'color: blue;', this)
  //   await this.props.userContext.getUserInfos()
  //   console.log('%c test: ', 'color: cyan', this)
  // }

  /* eslint-disable */
  render () {
    console.log('%c profile component render', 'color: blue;', this)
    if (this.props.userContext.uid === -1) {
      return (
        window.location.replace('/')
      )
    } else if (this.props.userContext.userData === undefined) {
      // on va rerender a l'update des props
      return (
        // TODO revoir le loader...
        <LoadingComp></LoadingComp>
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

            {
              (this.state.ActiveComponent === 'Geoloc' &&
              this.props.userContext.userData.GeolocAuth === 1) &&
                <GeolocContext.Consumer>
                  {(geolocContextProp) => <ProfileGeolocManager geolocContext={geolocContextProp}
                  userContext={this.props.userContext}/>
                  }
                </GeolocContext.Consumer>
            }
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
