import React, { Component } from 'react'

/* eslint-disable no-unused-vars */
export const UserContext = React.createContext()
/* eslint-enable no-unused-vars */

export class UserProvider extends Component {
  state = {
    uid: 'none uid'
  }

  UserProviderSetState = (newData) => {
    this.setState({ ...newData })
  }

  stateToString = () => {
    console.log('UserContext: ', this.state)
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
