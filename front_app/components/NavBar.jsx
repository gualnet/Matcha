/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// components
import SingoutForm from '../components/SignOut.jsx'

// context
import { UserContext } from '../contexts/UserContext'

// css
import { css } from '../assets/scss/components/NavBar.scss'
/* eslint-enable no-unused-vars */

export default class NavBar extends Component {
  swapSignForm = (event) => {
    event.preventDefault()
    let sigininElem = document.getElementById('signinForm')
    let registerElem = document.getElementById('signonForm_back')
    // console.log('sigininElem-->', sigininElem)
    // console.log('registerElem-->', registerElem)
    if (sigininElem !== null && sigininElem.id === 'signinForm' && registerElem.id === 'signonForm_back') {
      // swapToSignOn
      // turn login form from face to side
      sigininElem.id = `${sigininElem.id}_back`

      // turn register form from side to face
      registerElem.id = `${registerElem.id.replace('_back', '')}`
    } else {
      // swapToSignIn
      // turn login form from side to face
      sigininElem = document.getElementById('signinForm_back')
      sigininElem.id = `${sigininElem.id.replace('_back', '')}`

      // turn register form from face to side
      registerElem = document.getElementById('signonForm')
      registerElem.id = `${registerElem.id}_back`
    }
  }

  render () {
    console.log('nav bar render')

    const registerBtnIsVisible = () => {
      console.log('Call registerBtnIsVisible', this.props.userContext.uid)
      return (this.props.userContext.uid < 0 ? 'is-visible' : 'is-invisible')
    }

    return (
      <div id='NavBarWrapper'>

        <nav className='navbar'>
          <div className='navbar-menu is-active'>
            <div className='navbar-start'>
              <li className='navbar-item'><Link to='/'>Home</Link></li>
              <li className='navbar-item'><Link to='/profile'>Profile</Link></li>
              <li className='navbar-item'><Link to='/members'>Members</Link></li>
              <li className='navbar-item'><Link to='/search'>Search</Link></li>
              <li className='navbar-item'><Link to='/message'>Message</Link></li>
            </div>
            <div className='navbar-end'>
              <li className={`navbar-item ${registerBtnIsVisible()}`}
                onClick={(e) => this.swapSignForm(e)}
              ><Link to='/'>
              Register</Link></li>
              <UserContext.Consumer>
                {(context) => <SingoutForm userContext={context} />}
              </UserContext.Consumer>
            </div>
          </div>
        </nav>

      </div>
    )
  }
}
