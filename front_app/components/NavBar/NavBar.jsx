/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// COMPONENT
import SingoutForm from '../SignForms/SignOut.jsx'
import ConnexionForm from '../SignForms/ConnexionForm.jsx'

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
      this.setState({
        swapFormBtnName: 'Sign In'
      })
    } else {
      // swapToSignIn
      // turn login form from side to face
      signinElem = document.getElementById('signinWrapper_back')
      signinElem.id = `${signinElem.id.replace('_back', '')}`

      // turn register form from face to side
      registerElem = document.getElementById('signonWrapper')
      registerElem.id = `${registerElem.id}_back`
      this.setState({
        swapFormBtnName: 'Register'
      })
    }
  }

  leftItems = () => {
    var arrItems = []

    if (this.props.userContext.uid === -1) {
      arrItems.push(
        <div className='navbar-item' key='0'><Link to='/'>Home</Link></div>
      )
    } else if (this.props.userContext.uid > 0) {
      arrItems.push(
        <div className='navbar-item' key='0'><Link to='/'>Home</Link></div>)
      arrItems.push(
        <div className='navbar-item' key='1'><Link to='/profile'>Profile</Link></div>)
      arrItems.push(
        <div className='navbar-item' key='2'><Link to='/members'>Members</Link></div>)
      arrItems.push(
        <div className='navbar-item' key='3'><Link to='/search'>Search</Link></div>)
      arrItems.push(
        <div className='navbar-item' key='4'><Link to='/message'>Message</Link></div>)
    }
    return (arrItems)
  }

  render () {
    // console.log('%c NavBar RENDER: ', 'color: ;', this.props)

    return (
      <div id='NavBarWrapper'>
        <nav className='navbar'>
          <div className='navbar-menu is-active'>

            <div className='navbar-start'>
              {this.leftItems()}
            </div>

            <div className='navbar-end'>
              {
                this.props.userContext.uid === -1 &&
                <div className='navbar-item' onClick={ConnexionForm.showConForm}>
                  <Link to='/'>Connexion</Link>
                </div>
              }
              {
                this.props.userContext.uid !== -1 &&
                <div className='navbar-item'>
                  <UserContext.Consumer>
                    {(context) => <SingoutForm userContext={context} />}
                  </UserContext.Consumer>
                </div>
              }
            </div>
          </div>

        </nav>
        {
          this.props.userContext.uid === -1 &&
          <UserContext.Consumer>
            {(context) => <ConnexionForm userContext={context}/>}
          </UserContext.Consumer>
        }
      </div>
    )
  }
}
