
/* eslint-disable no-unused-vars */
import React from 'react'

// components
import SinginForm from '../components/SignIn.jsx'
import SingonForm from '../components/SignOn.jsx'
import SingoutForm from '../components/SignOut.jsx'

import { UserContext } from '../contexts/UserContext'
/* eslint-enable no-unused-vars */

const Home = () => {
  return (
    <div className='homeWrapper'>
      <section className="section">
        <div className="container">
          <h1 className="title">Home Page</h1>
        </div>
      </section>
      <UserContext.Consumer>
        {(context) => {
          return (
            <div>
              <SingonForm userContext={context} />
              <SinginForm userContext={context} />
              <SingoutForm userContext={context} />
            </div>
          )
        }}
      </UserContext.Consumer>
    </div>
  )
}

export default Home
