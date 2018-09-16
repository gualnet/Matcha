// IMPORTS
import jwt from 'jsonwebtoken'
import srvConf from '../utils/server'

module.exports = {
  genUserToken: (userData) => {
    console.log('data: ', userData)

    const truc = {
      uid: userData.UserId,
      token: userData.UserToken,
      login: userData.Login,
      firstName: userData.FirstName,
      lastName: userData.LastName,
      age: userData.Age,
      mail: userData.Mail,
      gender: userData.Gender,
      orientation: userData.Orientation,
      bio: userData.Bio,
      interest: userData.Interest,
      popularity: userData.Popularity,
      geoAuth: userData.GeolocAuth,
      BlockUsrList: userData.BlockedUsers,
      reported: userData.Reported
    }
    const token = jwt.sign(truc, srvConf.jwtSignSecret, { expiresIn: srvConf.jwtTokenDuration })
    console.log('TOKEN GEN: ', token)
    return (token)
  }
}
