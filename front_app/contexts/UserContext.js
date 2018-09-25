import React, { Component } from 'react'

/* eslint-disable no-unused-vars */
export const UserContext = React.createContext()
/* eslint-enable no-unused-vars */

export class UserProvider extends Component {
  constructor () {
    super()
    const storageContent = JSON.parse(window.localStorage.getItem('userContext'))
    console.log('storageContent: ', storageContent)
    if (!storageContent) {
      // default empty state/store
      this.state = {
        uid: -1,
        token: ''
      }
    } else {
      this.state = storageContent
    }
  }

  UserProviderSetState = (newData) => {
    this.setState({ ...newData })
  }

  stateToString = () => {
    console.log('UserContext: ', this.state)
  }

  componentDidUpdate () {
    window.localStorage.setItem('userContext', JSON.stringify(this.state))
  }

  render () {
    return (
      <UserContext.Provider value={{
        ...this.state,
        stateToString: this.stateToString,
        setState: this.UserProviderSetState
      }}>
        { this.props.children }
      </UserContext.Provider>
    )
  }
}
