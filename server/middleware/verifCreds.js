// IMPORT
import UsersMdl from '../models/UsersMdl'
import jwt from 'jsonwebtoken'
import serverConf from '../utils/server'

const handleExpiredToken = (res, decoded) => {
  console.log('handleExpiredToken: ', decoded)
  // ! regen a new token or [ask for reconnexion]
  return (res.status(401).type('json').json({
    success: false,
    msg: 'Token expired',
    result: {}
  }).end())
}

/**
   * * func credsInBody
   * @param userId: le user id
   * @returns true if creds are ok, else false
  **/
async function credsInBody (req, res) {
  try {
    /* eslint-disable-next-line */
    Object.entries(req.body.token).length
  } catch (error) {
    console.log('Error verifCreds : No token found.')
    return (res.status('401').type('json').json({
      success: false,
      msg: 'Unauthentified user !',
      result: {}
    }))
  }
  if (Object.entries(req.body.token).length > 0) {
    const userMdl = new UsersMdl()
    var sqlRsp = await userMdl.find({
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
    return (res.status('401').type('json').json({
      success: false,
      msg: 'Unauthentified user !',
      result: {}
    }))
  }
  req.body = {
    ...req.body,
    AUTH_USER: { ...sqlRsp[0] }
  }
}

async function credsInParams (req, res) {
  // console.log('credsInParams req.params: ', req.params)

  if (Object.entries(req.params.token).length > 0) {
    const userMdl = new UsersMdl()
    var sqlRsp = await userMdl.find({
      where: {
        UserId: req.params.uid,
        UserToken: req.params.token
      }
    }, 'AND')
    // console.log('---> ', sqlRsp)
    // console.log('+---> ', sqlRsp[0].UserToken)
    if (sqlRsp.length === 0) {
      return (res.status('401').type('json').json({
        success: false,
        msg: 'Unauthentified user !',
        result: {}
      }))
    }
    try {
      jwt.verify(sqlRsp[0].UserToken, serverConf.jwtSignSecret)
      // console.log('DECODE: ', decode)
    } catch (error) {
      return (handleExpiredToken(res, error))
    }
  } else {
    return (res.status('401').type('json').json({
      success: false,
      msg: 'Unauthentified user !',
      result: {}
    }))
  }
  req.params = {
    AUTH_USER: { ...sqlRsp[0] }
  }
}

export const verifCreds = async (req, res, next) => {
  console.log('\n\n')
  console.log('verif creds: ')
  // console.log('req.headers: ', req.headers)
  // console.log('req.params: ', req.params)
  // console.log('req.body: ', req.body)

  if (req.body.token !== undefined) {
    await credsInBody(req)
  } else if (req.params.uid !== undefined && req.params.token !== undefined) {
    await credsInParams(req)
  }

  console.log('END VERIF CREDS: ok')
  // console.log('END VERIF CREDS: ok', req.body)
  console.log('\n\n')
  next()
}
