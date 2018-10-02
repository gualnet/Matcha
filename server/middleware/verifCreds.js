// IMPORT
import UsersMdl from '../models/UsersMdl'
import jwt from 'jsonwebtoken'
import serverConf from '../utils/server'

const handleExpiredToken = (res, decoded) => {
  console.log('handleExpiredToken: ', decoded)
  // ! regen a new token or [ask for reconnexion]
  return (res.status(401).type('json').json({
    error: 'Token expired'
  }).end())

}

export const verifCreds = async (req, res, next) => {
  console.log('verif creds: ')
  // console.log('req.headers: ', req.headers)
  console.log('req.params: ', req.params)
  console.log('req.body: ', req.body)

  try {
    /* eslint-disable-next-line */
    Object.entries(req.body.token).length
  } catch (error) {
    console.log('Error verifCreds : No token found.')
    return (res.status(401).type('json').json({
      error: 'Unauthentified user !'
    }).end())
  }
  if (Object.entries(req.body.token).length > 0) {
    const userMdl = new UsersMdl()
    const sqlRsp = await userMdl.find({
      where: {
        UserToken: req.body.token
      }
    })
    // verif token
    console.log('RESPONSE FIND: ', sqlRsp)
    try {
      jwt.verify(req.body.token, serverConf.jwtSignSecret)
      // console.log('DECODE: ', decode)
    } catch (error) {
      return (handleExpiredToken(res, error))
    }
  } else {
    return (res.status(401).type('json').json({
      error: 'Unauthentified user !'
    }).end())
  }
  next()
  console.log('END VERIF CREDS\n\n\n')
}
