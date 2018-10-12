/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { UserContext } from '../../contexts/UserContext'
import genderNumToString from '../../utils/genderNumToString'
import orientationNumToString from '../../utils/orientationNumToString'

// CSS
import './ProfilePersonalInfo.scss'
/* eslint-enable no-unused-vars */

const profileTopInfoRight = (props) => {
  // console.log('profileTopInfoRight RENDER: ', props.userContext.userData)
  const { userData } = { ...props.userContext }

  return (
    <div className='container'>

      <div> First Name:
        <textarea className="textarea" type='text'
          defaultValue={`${userData.FirstName}`} rows='1'
          readOnly></textarea>
      </div>
      <div> Prenom:
        <textarea className="textarea" type='text'
          defaultValue={`${userData.LastName}`} rows='1'
          readOnly></textarea>
      </div>
      <div> Age:
        <textarea className="textarea" type='text'
          defaultValue={`${userData.Age}`} rows='1'
          readOnly></textarea>
      </div>
      <div> Sex:
        <textarea className="textarea" type='text'
          defaultValue={`${genderNumToString(userData.Gender)}`} rows='1' readOnly></textarea>
      </div>
      <div> Interested In:
        <textarea className="textarea" type='text'
          defaultValue={`${orientationNumToString(userData.Orientation)}`} rows='1' readOnly></textarea>
      </div>
      <div> Bio:
        <textarea className="textarea" type='text'
          defaultValue={`${userData.Bio}`}readOnly></textarea>
      </div>
    </div>
  )
}

export default profileTopInfoRight
