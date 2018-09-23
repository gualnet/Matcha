/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
/* eslint-enable no-unused-vars */
import axios from 'axios'

export default class SignOut extends Component {
  constructor () {
    super()
    this.state = {
      uid: 141,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE0MSwiVXNlclRva2VuIjoiYWN0aXZhdGVkIiwiTG9naW4iOiJqb25ueSIsIlBhc3N3b3JkIjoiKioqKioqKioqKiIsIkZpcnN0TmFtZSI6ImpvaG4iLCJMYXN0TmFtZSI6Im5vbTJmYW1pbGxlIiwiQWdlIjotMSwiTWFpbCI6Im1haWxAbWFpbC5mciIsIkdlbmRlciI6IiIsIk9yaWVudGF0aW9uIjoiSGV0ZXJvIiwiQmlvIjoiRW50ZXIgeW91ciBkZXNjcmlwdGlvbiBoZXJlLiIsIkludGVyc2VzdCI6IiIsIlBvcHVsYXJpdHkiOjUwLCJHZW9sb2NBdXRoIjoiZmFsc2UiLCJCbG9ja2VkVXNlcnMiOiIiLCJSZXBvcnRlZCI6ImZhbHNlIiwiaWF0IjoxNTM3NzI3Njc1LCJleHAiOjE1Mzc3MzEyNzV9.36eZPqLgTL5aQFe1dPGlEXaFhqiIjVPa3iM4A-QkbUk'
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    // * ================================
    const valTab = this.state

    axios({
      method: 'post',
      url: 'http://localhost:8880/api/user/logout/',
      data: valTab
    })
      .then((response) => {
        console.log('response ok: ', response)
        if (response.data.success === 'logout') {
          window.alert('logout success')
        }
        // this.setState({ redirect: response.data.docInfo.redirectTo })
      })
      .catch((error) => {
        console.log('response err: ', error)
      })
  }

  render () {
    return (
      <div className='signoutWrapper'>
        <form
          className='signoutForm'
          method="post"
          onSubmit={ (e) => this.submitForm(e) }
        >
          <button
            type="submit"
            value="submit"
          >logout</button>
        </form>
      </div>
    )
  }
}
