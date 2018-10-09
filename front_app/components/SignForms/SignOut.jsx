/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// CSS
import './SignOut.scss'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignOut extends Component {
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
        // !~ redirect on /home
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
