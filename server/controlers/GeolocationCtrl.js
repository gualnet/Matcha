// IMPORT
import axios from 'axios'
import Models from '../models/Models'
// import UsersMdl from '../models/UsersMdl'

/* eslint-disable */
export const GeolocationCtrl = {
  async setGeolocation (req, res) {
    // console.log('\n\nsetGeolocation:', req.body)
    const geolocMdl = new Models('Geolocation')
    var sqlRep = null
    const sqlFindRep = await geolocMdl.find({
      where: {
        Owner: req.body.AUTH_USER.UserId
      }
    })

    // console.log('findrep ==> ', sqlFindRep)
    if (sqlFindRep.length !== 0) {
      sqlRep = await geolocMdl.update({
        set: {
          Accuracy: req.body.Coordinatesaccuracy,
          Latitude: req.body.latitude,
          Longitude: req.body.longitude,
          Altitude: req.body.altitude,
        },
        where: {
          Owner: req.body.AUTH_USER.UserId,
        }
      })
      // console.log('update ==> ', sqlRep)
    } else {
      sqlRep = await geolocMdl.insert({
        where: {
          Owner: req.body.AUTH_USER.UserId,
          Accuracy: req.body.Coordinatesaccuracy,
          Latitude: req.body.latitude,
          Longitude: req.body.longitude,
          Altitude: req.body.altitude
        }
      })
      // console.log('insert ==> ', sqlRep)
    }

    if (sqlRep !== null) {
      return (res.status('201').type('json').json({
        success: true,
        msg: 'ok',
        result: {}
      }))
    } else {
      return (res.status('400').type('json').json({
        success: false,
        msg: 'nok',
        result: {}
      }))
    }
  },

  async getGeolocation (req, res) {
    console.log('\n\ngetGeolocation')
    const geolocMdl = new Models('Geolocation')

    let sqlRep = await geolocMdl.find({
      where: {
        Owner: req.body.AUTH_USER.UserId
      }
    })

    // console.log('rep ==> ', sqlRep)
    delete sqlRep[0].idGeolocation
    delete sqlRep[0].Owner
    // console.log('rep ++> ', sqlRep)
    if (sqlRep !== null) {
      return (res.status('200').type('json').json({
        success: true,
        msg: 'ok',
        result: { ...sqlRep[0] }
      }))
    } else {
      return (res.status('204').type('json').json({
        success: false,
        msg: 'nok',
        result: {}
      }))
    }
  },

  async reverseGeoloc (req, res) {
    console.log('\n\nreverseGeoloc')

    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${req.body.lon}&lat=${req.body.lat}`
    try {
      const response = await axios.get(url)
      var data = response.data
      // console.log('response', response)
      console.log('data', {...data})
    } catch (error) {
      console.error(error)
      return (res.status('204').type('json').json({
        success: false,
        msg: 'nok',
        result: {}
      }))
    }

    return (res.status('200').type('json').json({
      success: true,
      msg: 'ok',
      result: { ...data }
    }))








    // const fetchResp = await axios(`https://api-adresse.data.gouv.fr/reverse/?lon=${req.body.lon}&lat=${req.body.lat}`, {
    //   method: 'POST',
    // })
    // if (fetchResp.ok) {
    //   const repData = fetchResp.json()
    //   console.log('repData:', {repData})
    // }
  }
}
