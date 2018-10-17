/* eslint-disable no-unused-vars */
import React from 'react'

// CSS
import './ProfileGeolocManager.scss'
/* eslint-enable no-unused-vars */

/* eslint-disable */
const ANOTHER_API_KEY = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'

const ProfileGeolocManager = (props) => {
  console.log('ProfileGeolocManager Props: ', props)
  const geolocContext = props.geolocContext
  console.log('ProfileGeolocManager geolocData: ', geolocContext.data)

  // window.setTimeout(props.geolocContext.updateCurrentPos(true), 10000)
  // props.geolocContext.updateCurrentPos(true)
  // googleMapInsert

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
      console.log('repData ==>', repData)
      
    }
  }

  const reverseGeoloc = async (lon, lat) => {
    const fetchResp = await window.fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`,
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': 'api-adresse.data.gouv.fr'
      }

    }
    )
    if (fetchResp.ok) {
      const repData = fetchResp.json()
      console.log('repData:', {repData})
    }
  }

  return (
    <div>
      <button className='button is-primary'
        onClick={locateMe}
      > Localisez moi </button>
      <button className='button is-primary'
        onClick={getGeolocDB}
      > test get data in db </button>
      <button className='button is-primary'
        onClick={() => reverseGeoloc(geolocContext.data.longitude, geolocContext.data.latitude)}
      > test reverse geoloc </button>
      <p>{`Coordinatesaccuracy: ${geolocContext.data.Coordinatesaccuracy}`}</p>
      <p>{`altitude: ${geolocContext.data.altitude}`}</p>
      <p>{`altitudeAccuracy: ${geolocContext.data.altitudeAccuracy}`}</p>
      <p>{`heading: ${geolocContext.data.heading}`}</p>
      <p>{`latitude: ${geolocContext.data.latitude}`}</p>
      <p>{`longitude: ${geolocContext.data.longitude}`}</p>
      <p>{`speed: ${geolocContext.data.speed}`}</p>
      <p>{`timestamp: ${geolocContext.data.timestamp}`}</p>

      <div className='button'
      onClick={gotoGoogleMap}
      >Show my position</div>

    </div>
  )
}

export default ProfileGeolocManager
