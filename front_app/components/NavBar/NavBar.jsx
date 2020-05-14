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

  /* eslint-disable */
  render () {
    // console.log('%c NavBar RENDER: ', 'color: ;', this.props)
    return (

      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='https://bulma.io'>
            <img src='https://images.unsplash.com/photo-1515871204537-49a5fe66a31f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a8e0a0bcf73f65a1ecfdb9b97ec7204c&auto=format&fit=crop&w=1948&q=80' width='112' height='28' />
          </a>

          <a role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-start'>
            <a className='navbar-item'>
              Home
            </a>

            <a className='navbar-item'>
              Documentation
            </a>

            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'>
                More
              </a>

              <div className='navbar-dropdown'>
                <a className='navbar-item'>
                  About
                </a>
                <a className='navbar-item'>
                  Jobs
                </a>
                <a className='navbar-item'>
                  Contact
                </a>
                <hr className='navbar-divider'/>
                <a className='navbar-item'>
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                <a className='button is-primary'>
                  <strong>Sign up</strong>
                </a>
                <a className='button is-light'>
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )

    // return (
    //   <div id='NavBarWrapper'>
    //     <nav className='navbar is-mobile'>
    //       <div className='navbar-menu is-active'>

    //         <div className='navbar-start'>
    //           {this.leftItems()}
    //         </div>

    //         <div className='navbar-end'>
    //           {
    //             this.props.userContext.uid === -1 &&
    //             <div className='navbar-item' onClick={ConnexionForm.showConForm}>
    //               <Link to='/'>Connexion</Link>
    //             </div>
    //           }
    //           {
    //             this.props.userContext.uid !== -1 &&
    //             <div className='navbar-item'>
    //               <UserContext.Consumer>
    //                 {(context) => <SingoutForm userContext={context} />}
    //               </UserContext.Consumer>
    //             </div>
    //           }
    //         </div>
    //       </div>

    //     </nav>
    //     {
    //       this.props.userContext.uid === -1 &&
    //       <UserContext.Consumer>
    //         {(context) => <ConnexionForm userContext={context}/>}
    //       </UserContext.Consumer>
    //     }
    //   </div>
    // )

  }
}
