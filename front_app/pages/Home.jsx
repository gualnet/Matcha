
/* eslint-disable no-unused-vars */
import React from 'react'

// components
import SinginForm from '../components/SignIn.jsx'
import SingonForm from '../components/SignOn.jsx'

// context
import { UserContext } from '../contexts/UserContext'

// css
import { css } from '../assets/scss/pages/Home.scss'
/* eslint-enable no-unused-vars */

const Home = () => {
  return (
    <section className='section' id='homeWrapper'>
      {/* <h1 className='title'>Home Page</h1> */}
      <UserContext.Consumer>
        {(context) => {
          return (
            <div>
              <SingonForm userContext={context} />
              <SinginForm userContext={context} />
            </div>
          )
        }}
      </UserContext.Consumer>
    </section>
  )
}

export default Home
