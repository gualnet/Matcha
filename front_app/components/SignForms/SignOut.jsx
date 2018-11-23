/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import socketHandlers from '../../utils/socket'

// CSS
import './SignOut.scss'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignOut extends Component {
  submitForm = (e) => {
    console.log('submitForm: ', e)
    e.preventDefault()
    // * ================================

    axios({
      method: 'post',
      url: '/api/user/logout/',
      data: {
        uid: this.props.userContext.uid,
        token: this.props.userContext.token
      }
    })
      .then((response) => {
        console.log('response ok: ', response)
        if (response.data.success === 'logout') {
          // socket emit logout
          console.log('oooooooo', this.props.userContext)
          console.log('oooooooo', this.props.userContext.uid)
          console.log('oooooooo', this.props.userContext.token)
          const payload = {
            uid: this.props.userContext.uid,
            token: this.props.userContext.token
          }
          console.log('payload', payload)
          socketHandlers.logout(payload)

          this.props.userContext.setState({
            uid: -1,
            token: 'none',
            userData: ''
          })
          window.localStorage.clear()
        }
        window.location.assign('/')
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  logoutIsVisible = () => {
    return (this.props.userContext.uid > 0 ? 'is-visible' : 'is-invisible')
  }

  render () {
    return (
      <li
        className={`navbar-item ${this.logoutIsVisible()}`}
        id='btnSignOut'
        onClick={ (e) => this.submitForm(e) }
      >
        <Link to='/'>
          Logout
        </Link>
      </li>
    )
  }
}
