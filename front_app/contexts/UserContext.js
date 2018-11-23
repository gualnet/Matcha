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
    // console.log('%c UserContext Before setState: ', 'color: ;', { newData })
    this.setState({ ...newData })
  }

  /**
   * * func getUserInfos:
   * This function get the user data from the db
   * and set the userContext with the new data
   *
   * @return : void
  **/
  async getUserInfos (puid = -999, ptoken = -999) {
    // console.log('CALL getUserInfos ')
    // console.log('this.uid: ', this.uid)
    if ((this.uid === -1 && puid === -999) || (this.token === '' && ptoken === -999)) {
      return
    }

    let url = (puid !== -999 && ptoken !== -999) ? `/api/user/profil/${puid}/${ptoken}` : `/api/user/profil/${this.uid}/${this.token}`

    const fetchRsp = await window.fetch(url)
    console.log('UserContext fetchRsp: ', fetchRsp)
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
    // console.log('%c UserContextProvider componentDidUpdate: ', 'color: green;')
    window.localStorage.setItem('userContext', JSON.stringify(this.state))
  }

  render () {
    // console.log('%c UserContextProvider RENDER: ', 'color: green;', { ...this })
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
