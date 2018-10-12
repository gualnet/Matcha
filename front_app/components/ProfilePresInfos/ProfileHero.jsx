/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

// CSS
import './profileHero.scss'
/* eslint-enable no-unused-vars */

const profileHero = (props) => {
  // console.log('profileHero RENDER ', props)
  const { userData } = { ...props.userContext }
  // const { activeComp, handleActiveCompChange } = { ...props }
  // console.log('activeComp:', {activeComp})

  return (
    <div className='hero is-light' id='profileHero0'>
      <div className='hero-body'>
        <div className='container has-text-centered'>
          <figure className='image'>
            <img className='image is-96x96 is-rounded' src='https://images.unsplash.com/photo-1506357997910-c76d3e4d3ecf?ixlib=rb-0.3.5&s=3355befb40b2c272634910fb5f80ad75&auto=format&fit=crop&w=1650&q=80'></img>
          </figure>
        </div>
        <div className='container has-text-centered'>
          <h1 className='title'>{`${userData.Login}`}</h1>
          <h5 className='subtitle is-5'>{`${userData.Popularity}`}pts</h5>
          <p className='subtitle is-5' id='locationLabel'>[?Location?]</p>
        </div>
      </div>
      <div className='hero-foot'>
        <nav className='tabs is-boxed'>
          <div className='container has-text-centered'>
            <ul>
              {/* <li><a onClick={handleActiveCompChange}> */}
              <li><a
                onClick={(e) => {
                  props.handleActiveCompChange(e, 'InfoPerso')
                }}>
                Info perso</a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    props.handleActiveCompChange(e, 'Description')
                  }}>
                Description</a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    props.handleActiveCompChange(e, 'Hobby')
                  }}>
                Hobby</a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    props.handleActiveCompChange(e, 'Photo')
                  }}>
                Photo</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default profileHero
