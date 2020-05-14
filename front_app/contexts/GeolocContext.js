import React, { Component } from 'react'

/* eslint-disable no-unused-vars */
export const GeolocContext = React.createContext()
/* eslint-enable no-unused-vars */

/* eslint-disable */
export class GeolocProvider extends Component {
  constructor (props) {
    super(props)
    this.uid = props.uid
    this.token = props.token
    this.state = {
      Coordinatesaccuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null,
      timestamp: 0,
      city: '',
      cityCode: '',
      street: '',
      label: 'coucou'
    }
  }

  dataToDb () {
    // console.log('%c dataToDb:', 'color: cyan', this.uid, this.token)
    if ((this.state.longitude === 0 && this.state.latitude === 0) ||
    (this.uid < 0 || this.token == undefined)) {
      return (false)
    }
    const dataToSend = {
      ...this.state,
      uid: this.uid,
      token: this.token
    }
    // console.log('%c --->', 'color: cyan', { dataToSend })
    window.fetch('/api/geoloc/set', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    return (true)
  }

  updateCurrentPos = (accurate = false) => {
    console.log('%c CALL updateCurrentPos: ', 'color: green;')

    const reverseGeoloc = async () => {
      console.log('------------------->', props.geolocContext.data.longitude)
      const dataToSend = {
        uid: this.uid,
        token: this.token,
        lon: this.state.longitude,
        lat: this.state.latitude
      }
      const fetchResp = await window.fetch('/api/geoloc/rev',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      }
      )
      if (fetchResp.ok) {
        const repData = await fetchResp.json()
        // console.log('repData ==>', repData)
        if (repData.success === true &&
        repData.result.features.length !== 0) {
          const reverseProperties = repData.result.features[0].properties
          this.setState({
            city: reverseProperties.city,
            cityCode: reverseProperties.citycode,
            street: reverseProperties.street,
            label: reverseProperties.label
          })
        }
      }
    }

    const geolocSuccess = (response) => {
      const coordsData = response.coords
      console.log('%c updateCurrentPos success: ', 'color: orange;', {response})
      console.log('%c updateCurrentPos success: ', 'color: orange;', {coordsData})

      this.setState({
        Coordinatesaccuracy: coordsData.accuracy,
        altitude: coordsData.altitude,
        altitudeAccuracy: coordsData.altitudeAccuracy,
        heading: coordsData.heading,
        latitude: coordsData.latitude,
        longitude: coordsData.longitude,
        speed: coordsData.speed,
        timestamp: response.timestamp
      })
      reverseGeoloc()
    }

    const geolocError = (err) => {
      console.log('%c updateCurrentPos error: ', 'color: red;', err)
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    const options = {
      enableHighAccuracy: accurate,
      timeout: Infinity,
      maximumAge: Infinity
    }

    console.log('%c CALL updateCurrentPos STEP1: ', 'color: green;')
    window.navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError, options)
    console.log('%c CALL updateCurrentPos END: ', 'color: green;')
  }

  updateManualPos = async (city = '') => {
    console.log('%c updateManualPos')
    if (city.length < 1) {
      return (false)
    }

    const dataToSend = {
      uid: this.uid,
      token: this.token,
      location: city.toLocaleLowerCase()
    }
    const fetchRep = await window.fetch('/api/geoloc/man', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    if (fetchRep.ok) {
      const repData = await fetchRep.json()
      console.log('repData', {repData})

      const repCityData = repData.result.features[0]
      this.setState({
        city: repCityData.properties.city,
        cityCode: repCityData.properties.postcode,
        label: '',
        street: '',
        latitude: repCityData.geometry.coordinates[1],
        longitude: repCityData.geometry.coordinates[0]
      })
    } else {
      console.error('%c ERROR: ', 'color: red;', {fetchRep})
    }
  }

  componentDidMount = () => {
    // console.log('%c GeolocProvider componentDidMount: ', 'color: green;')
    // this.updateCurrentPos(true)
  }

  render () {
    // console.log('%c GeolocContextProvider RENDER: ', 'color: green;', { ...this 
    // })
    if (this.dataToDb()) {
      console.log('%c Geoloc data sent to database', 'color: green')
    } else {
      // console.log('%c Geoloc data NOT sent to database', 'color: red')
    }
    // console.log('\n\n\n\n\n')
    return (
      <GeolocContext.Provider
        value={{
          data: this.state,
          updateCurrentPos: this.updateCurrentPos,
          updateManualPos: this.updateManualPos
        }}>
        { this.props.children }
      </GeolocContext.Provider>
    )
  }
}
