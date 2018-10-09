/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { UserContext } from '../../contexts/UserContext'
import genderNumToString from '../../utils/genderNumToString'
import orientationNumToString from '../../utils/orientationNumToString'

// CSS
import './profileTopInfoRight.scss'
/* eslint-enable no-unused-vars */

const profileTopInfoRight = (props) => {
  // console.log('profileTopInfoRight RENDER: ', props.userContext.userData)
  const { userData } = { ...props.userContext }
  return (
    <div className='column' id='columnRight'>

      <div className='container'>
        <p>{`${userData.Login}`} - {`${userData.Popularity}`} - [?Location?]</p>
        <p>{`${userData.FirstName}`} - {`${userData.LastName}`} - {`${userData.Age}`}</p>
        <p>{`${genderNumToString(userData.Gender)}`} - {`${orientationNumToString(userData.Orientation)}`}</p>
      </div>

    </div>
  )
}

export default profileTopInfoRight
