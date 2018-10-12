import React, { Component } from 'react'

/* eslint-disable no-unused-vars */
export const GeolocContext = React.createContext()
/* eslint-enable no-unused-vars */

export class GeolocProvider extends Component {
  constructor () {
    super()
    this.state = {
      Coordinatesaccuracy: 20,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 48.8966552,
      longitude: 2.3183431,
      speed: null,
      timestamp: 1539338854411
    }
  }

  updateCurrentPos = (accurate = false) => {
    const geolocSuccess = (coords) => {
      console.log('success: ', coords)
      this.setState({
        Coordinatesaccuracy: coords.Coordinatesaccuracy,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        latitude: coords.latitude,
        longitude: coords.longitude,
        speed: coords.speed,
        timestamp: coords.timestamp
      })
      return ('success')
    }

    function geolocError (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    const options = {
      enableHighAccuracy: accurate,
      timeout: Infinity,
      maximumAge: Infinity
    }

    window.navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError, options)
  }

  render () {
    console.log('%c GeolocContextProvider RENDER: ', 'color: green;', { ...this })
    return (
      <GeolocContext.Provider
        value={{
          data: this.state,
          updateCurrentPos: this.updateCurrentPos
        }}>
        { this.props.children }
      </GeolocContext.Provider>
    )
  }
}
