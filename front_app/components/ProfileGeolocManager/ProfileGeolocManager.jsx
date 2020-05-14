/* eslint-disable no-unused-vars */
import React from 'react'

import ManualLocationHandler from './ManualLocationHandler.jsx'

// CSS
import './ProfileGeolocManager.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
const ANOTHER_API_KEY = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'

const ProfileGeolocManager = (props) => {
  console.log('ProfileGeolocManager Props: ', props)
  const geolocContext = props.geolocContext
  console.log('ProfileGeolocManager geolocData: ', geolocContext.data)

  const gotoGoogleMap = () => {
    window.open(`https://www.google.fr/maps/@${geolocContext.data.latitude},${geolocContext.data.longitude},18z`)
  }

  const locateMe = () => {
    props.geolocContext.updateCurrentPos()
  }

  const getGeolocDB = async () => {
    const dataToSend = {
      uid: props.userContext.uid,
      token: props.userContext.token
    }
    const rep = await window.fetch('/api/geoloc/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })

    if (rep.ok) {
      const repData = await rep.json()
      console.log('+repData ==>', repData)
    }
  }

  if (navigator.geolocation) {
    alert('Geolocation is ok')
  } else { 
    alert('Geolocation is not supported by this browser.')
  }

  return (
    <div>
      <div className='box container'>
      <div className='container has-text-left'>
        <p>{`Coordinatesaccuracy: ${geolocContext.data.Coordinatesaccuracy}`}</p>
        <p>{`altitude: ${geolocContext.data.altitude}`}</p>
        <p>{`altitudeAccuracy: ${geolocContext.data.altitudeAccuracy}`}</p>
        <p>{`heading: ${geolocContext.data.heading}`}</p>
        <p>{`latitude: ${geolocContext.data.latitude}`}</p>
        <p>{`longitude: ${geolocContext.data.longitude}`}</p>
        <p>{`speed: ${geolocContext.data.speed}`}</p>
        <p>{`timestamp: ${geolocContext.data.timestamp}`}</p>
      </div>
      <div className='container has-text-right'>
        <div>
          <button className='button is-primary'
            onClick={locateMe}
            > Localisez moi </button>
        </div>
        <div>
          <button className='button is-primary'
            onClick={getGeolocDB}
            > test get data in db </button>
        </div>

        <div>
          <button className='button'
          onClick={gotoGoogleMap}
          >Show my position</button>
        </div>
      </div>
      </div>

      <div className='box container has-text-centered'>
      <h3 className='title is-5'>data :{
        props.geolocContext.data.label.length > 1 ? `${props.geolocContext.data.label}` : `${props.geolocContext.data.city}`
      }</h3>
      </div>

      <ManualLocationHandler
        geolocContext={props.geolocContext}
        userContext={props.userContext}
      ></ManualLocationHandler>

    </div>
  )
}

export default ProfileGeolocManager
