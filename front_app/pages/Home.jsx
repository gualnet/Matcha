/* eslint-disable no-unused-vars */
import React from 'react'

// COMPONENT
import RegistrationForm from '../components/SignForms/RegistrationForm.jsx'
import SingonForm from '../components/SignForms/SignOn.jsx'
import MsgPop from '../components/MsgPop/MsgPop.jsx'

// CONTEXT
import { UserContext } from '../contexts/UserContext'

// CSS
import './Home.scss'
/* eslint-enable no-unused-vars */

// /* eslint-disable */
class Home extends React.Component {
  render () {
    console.log('HOME this:', this)

    if (this.props.userContext.uid > 0) {
      // logged case
      return (
        <section className='section' id='homeWrapper'>

          <h1 className='title'>Home Page</h1>
          <p>Welcome {this.props.userContext.uid}</p>

          <MsgPop
            level='info'
            id='popup test'
            message='popup test message...'
          ></MsgPop>
          <button className='button is-info is-outlined'
            onClick={() => MsgPop.showPopup({ id: 'popup test' })}
          > test popup message</button>

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
                  <RegistrationForm></RegistrationForm>
                  {/* <SingonForm userContext={context} /> */}
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
