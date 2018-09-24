/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import css from '../assets/scss/components/SignOut.scss'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignOut extends Component {
  constructor () {
    super()
    this.state = {
      uid: '',
      token: ''
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    // * ================================

    axios({
      method: 'post',
      url: 'http://localhost:8880/api/user/logout/',
      data: {
        uid: this.props.userContext.uid,
        token: this.props.userContext.token
      }
    })
      .then((response) => {
        console.log('response ok: ', response)
        if (response.data.success === 'logout') {
          window.alert('logout success')
          this.props.userContext.setState({
            uid: -1,
            token: 'none'
          })
        }
        // this.setState({ redirect: response.data.docInfo.redirectTo })
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  render () {
    const userContext = this.props.userContext
    return (
      <div id='signoutWrapper'>
        <form
          id='signout'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >
          <p>sign out user id: {userContext.uid}</p>
          <p>sign in token: {userContext.token}</p>
          <button
            type="submit"
            value="submit"
          >logout</button>
        </form>
      </div>
    )
  }
}
