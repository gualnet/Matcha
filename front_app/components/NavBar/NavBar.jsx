/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// COMPONENT
import SingoutForm from '../SignForms/SignOut.jsx'

// CONTEXT
import { UserContext } from '../../contexts/UserContext'

// CSS
import './NavBar.scss'
/* eslint-enable no-unused-vars */

export default class NavBar extends Component {
  swapSignForm = (event) => {
    event.preventDefault()
    let signinElem = document.getElementById('signinWrapper')
    let registerElem = document.getElementById('signonWrapper_back')
    console.log('signinElem-->', signinElem)
    console.log('registerElem-->', registerElem)
    if (signinElem !== null && signinElem.id === 'signinWrapper' && registerElem.id === 'signonWrapper_back') {
      // swapToSignOn
      // turn login form from face to side
      signinElem.id = `${signinElem.id}_back`

      // turn register form from side to face
      registerElem.id = `${registerElem.id.replace('_back', '')}`
    } else {
      // swapToSignIn
      // turn login form from side to face
      signinElem = document.getElementById('signinWrapper_back')
      signinElem.id = `${signinElem.id.replace('_back', '')}`

      // turn register form from face to side
      registerElem = document.getElementById('signonWrapper')
      registerElem.id = `${registerElem.id}_back`
    }
  }

  render () {
    // console.log('%c NavBar RENDER: ', 'color: ;', this.props)
    const registerBtnIsVisible = () => {
      return (this.props.userContext.uid < 0 ? 'is-visible' : 'is-invisible')
    }

    return (
      <div id='NavBarWrapper'>
        <nav className='navbar'>
          <div className='navbar-menu is-active'>
            <div className='navbar-start'>
              <div className='navbar-item'><Link to='/'>Home</Link></div>
              <div className='navbar-item'><Link to='/profile'>Profile</Link></div>
              <div className='navbar-item'><Link to='/members'>Members</Link></div>
              <div className='navbar-item'><Link to='/search'>Search</Link></div>
              <div className='navbar-item'><Link to='/message'>Message</Link></div>
            </div>
            <div className='navbar-end'>
              <div className={`navbar-item ${registerBtnIsVisible()}`}
                onClick={(e) => this.swapSignForm(e)}
              >
                <Link to='/'>
                Register
                </Link>
              </div>
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
