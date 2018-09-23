
/* eslint-disable no-unused-vars */
import React from 'react'

// components
import SinginForm from '../components/SignIn.jsx'
import SingonForm from '../components/SignOn.jsx'
import SingoutForm from '../components/SignOut.jsx'
/* eslint-enable no-unused-vars */

const Home = () => {
  return (
    <div className='homeWrapper'>
      <p>HOME PAGE</p>
      <SingonForm />
      <SinginForm />
      <SingoutForm />
    </div>
  )
}

export default Home
