import React, { Component } from 'react'

/* eslint-disable no-unused-vars */
export const UserContext = React.createContext()
/* eslint-enable no-unused-vars */

export class UserProvider extends Component {
  constructor () {
    super()
    const storageContent = JSON.parse(window.localStorage.getItem('userContext'))
    if (!storageContent) {
      this.state = {
        uid: -1,
        token: ''
      }
    } else {
      this.state = storageContent
    }
  }

  UserProviderSetState = (newData) => {
    // console.log('%c UserContext Before setState: ', 'color: ;', { ...this.state })
    console.log('%c UserContext Before setState: ', 'color: ;', { newData })
    this.setState({ ...newData })
  }

  /**
   * * func getUserInfos:
   * This function get the user data from the db
   * and set the userContext with the new data
   *
   * @return : void
  **/
  async getUserInfos () {
    console.log('CALL getUserInfos ')
    // console.log('this.uid: ', this.uid)
    if (this.uid === -1 || this.token === '') {
      return
    }

    const fetchRsp = await window.fetch(`/api/user/profil/${this.uid}/${this.token}`)
    // console.log('UserContext fetchRsp: ', fetchRsp)
    if (fetchRsp.ok) {
      const responseData = await fetchRsp.json()
      console.log('fetchRsp.body: ', responseData)
      const curUid = this.uid
      const curToken = this.token
      this.setState({
        userData: {
          uid: curUid,
          token: curToken,
          ...responseData.result
        }
      })
    }
  }

  componentDidUpdate () {
    window.localStorage.setItem('userContext', JSON.stringify(this.state))
  }

  render () {
    console.log('%c UserContextProvider RENDER: ', 'color: blue;', { ...this })
    return (
      <UserContext.Provider value={{
        ...this.state,
        stateToString: this.stateToString,
        getUserInfos: this.getUserInfos,
        setState: this.UserProviderSetState
      }}>
        { this.props.children }
      </UserContext.Provider>
    )
  }
}
