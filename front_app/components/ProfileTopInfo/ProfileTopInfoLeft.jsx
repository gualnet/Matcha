/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// CSS
import './profileTopInfoLeft.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
const profileTopInfoLeft = ({userData}) => {
  // console.log('profileTopInfo RENDER ')
  return (
    <div className='column is-one-fifth is-offset-2' id='columnLeft'>
      <figure className='image is-128x128'>

        <img className='is-rounded' src='https://images.unsplash.com/photo-1506357997910-c76d3e4d3ecf?ixlib=rb-0.3.5&s=3355befb40b2c272634910fb5f80ad75&auto=format&fit=crop&w=1650&q=80'></img>

      </figure>
    </div>
  )
}

export default profileTopInfoLeft
