
/* eslint-disable no-unused-vars */
import React from 'react'

// components
import SinginForm from '../components/SignForms/SignIn.jsx'
import SingonForm from '../components/SignForms/SignOn.jsx'

// context
import { UserContext } from '../contexts/UserContext'

// css
import './Home.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
class Home extends React.Component {

  render () {
    // console.log('this:', this)
    // console.log('this.props:', this.props)
    // console.log('this.props.userContext:', this.props.userContext)
    // console.log('this.props.userContext.uid:', this.props.userContext.uid)

    if (this.props.userContext.uid > 0) {
      // logged case
      return (
        <section className='section' id='homeWrapper'>
          <h1 className='title'>Home Page</h1>
          <p>Welcome {this.props.userContext.uid}</p>
        </section>
      )
    } else {
      // not logged case
      return (
        <section className='section' id='homeWrapper'>
          <UserContext.Consumer>
            {(context) => {
              return (
                <div>
                  <SinginForm userContext={context} />
                  <SingonForm userContext={context} />
                </div>
              )
            }}
          </UserContext.Consumer>
        </section>
      )
    }
  }
}

export default Home
