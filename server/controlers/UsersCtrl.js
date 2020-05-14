// IMPORT
import Models from '../models/Models'
import UsersMdl from '../models/UsersMdl'
import bcrypt from 'bcrypt'
import tokenUtil from '../utils/token_util'
import serverConf from '../utils/server'
import { LikesCtrl } from '../controlers/LikesCtrl'

// CONST
const FILENAME = __filename.replace(`${__dirname}/`, '')
//

const profilInputVerif = (params) => {
  console.log('VERIF PARAMS: ', params)
  Object.entries(params).forEach(([key, val]) => {
    if (val === undefined || val.length === 0) {
      delete params[key]
    }
  })
  const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  // regexPassword for mini 8chars 1alpha 1num
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  var retTab = {}
  try {
    if (params.Login) {
      if (params.Login === '' || params.Login.length < 2 || params.Login.length > 25) {
        retTab.verifLogin = false
      } else {
        retTab.verifLogin = true
      }
    }
    if (params.Mail) {
      if (params.Mail === '' || !regexMail.test(params.Mail) || params.Mail.length > 100) {
        retTab.verifMail = false
      } else {
        retTab.verifMail = true
      }
    }
    if (params.Password) {
      if (params.Password === '' || !regexPassword.test(params.Password) || params.Password.length > 100) {
        retTab.verifPassword = false
      } else {
        retTab.verifPassword = true
      }
    }
    if (params.FirstName) {
      if (params.FirstName.length < 2 || params.FirstName.length > 60) {
        retTab.verifFirstName = false
      } else {
        retTab.verifFirstName = true
      }
    }
    if (params.LastName) {
      if (params.LastName.length < 2 || params.LastName.length > 60) {
        retTab.verifLastName = false
      } else {
        retTab.verifLastName = true
      }
    }
    if (params.Age) {
      if (params.Age < 0 || params.Age > 111) {
        retTab.verifAge = false
      } else {
        retTab.verifAge = true
      }
    }
    if (params.Gender) {
      if (params.Gender < 1 || params.Gender > 3) {
        retTab.verifGender = false
      } else {
        retTab.verifGender = true
      }
    }
    if (params.Orientation) {
      if (params.Orientation < 1 || params.Orientation > 5) {
        retTab.verifOrientation = false
      } else {
        retTab.verifOrientation = true
      }
    }
    if (params.Bio) {
      if (params.Bio.length < 1 || params.Bio.length > 500) {
        retTab.verifBio = false
      } else {
        retTab.verifBio = true
      }
    }
    if (params.Interest) {
      if (params.Interest.length < 1 || params.Interest.length > 500) {
        retTab.verifInterest = false
      } else {
        retTab.verifInterest = true
      }
    }
    if (params.Popularity) {
      if (params.Popularity < -500 || params.Popularity > 500) {
        // ? si depassement de bornes set aux bornes
        // ? ou rejet de la modif
        retTab.verifPopularity = false
      } else {
        retTab.verifPopularity = true
      }
    }
    if (params.GeolocAuth) {
      if (params.GeolocAuth !== 1 && params.GeolocAuth !== 0) {
        retTab.verifGeolocAuth = false
      } else {
        retTab.verifGeolocAuth = true
      }
    }
    if (params.BlockedUsers) {
      if (params.BlockedUsers.length > 1000) {
        retTab.verifBlockedUsers = false
      } else {
        retTab.verifBlockedUsers = true
      }
    }
    if (params.Reported) {
      if (params.Reported !== 'true' && params.Reported !== 'false') {
        retTab.verifReported = false
      } else {
        retTab.verifReported = true
      }
    }
    if (params.Height) {
      if (params.Height < 1.30 && params.Height > 2.20) {
        retTab.verifHeight = false
      } else {
        retTab.verifHeight = true
      }
    }
    if (params.Weight) {
      if (params.Weight < 20 && params.Weight > 120) {
        retTab.verifWeight = false
      } else {
        retTab.verifWeight = true
      }
    }
    if (params.EyeColor) {
      if (params.EyeColor < 0 && params.EyeColor > 3) {
        retTab.verifEyeColor = false
      } else {
        retTab.verifEyeColor = true
      }
    }
    if (params.HairColor) {
      if (params.HairColor < 0 && params.HairColor > 5) {
        retTab.verifHairColor = false
      } else {
        retTab.verifHairColor = true
      }
    }
  } catch (error) {
    console.error(`Error in ${FILENAME} - profilInputVerif: `, error)
    return false
  }
  return (retTab)
}

exports.UsersCtrl = {
  registerNewUser: async (req, res) => {
    console.log('UsersCtrl func register')
    // recup / verif des donnees
    let params = { ...req.body }
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.body.login)
    console.log('PARAMS: ', params)
    const retTab = profilInputVerif(params)
    console.log('retTab===>', retTab)
    for (let elem in retTab) {
      console.log(`retTab.elem={${retTab[elem]}}`)
      if (!retTab[elem]) {
        return (res.status('200').type('json').json({
          success: false,
          msg: 'error verif',
          result: {
            ...retTab
          }
        }))
      }
    }

    const userMdl = new UsersMdl()
    // test if login or mail already exists
    const response = await userMdl.find({
      where: {
        Login: params.Login,
        Mail: params.Mail
      }
    }, 'OR')
    console.log('find response0 ', response)

    if (response.length !== 0) {
      let error = {
        login: false,
        mail: false
      }
      if (response[0].Login === params.Login) {
        console.log('On passe ici')
        error.login = true
      }
      if (response[0].Mail === params.Mail) {
        console.log('On passe la')
        error.mail = true
      }
      console.log('TEST ERRROR: ', error)
      return (res.status('200').type('json').json({
        success: false,
        msg: 'used',
        result: {
          ...error
        }
      }))
    } else {
      // Creation du nouvel utilisateur
      userMdl.createNewUser(params)
        .then((response) => {
          console.log('create new user response: ', response)
          return (res.status(201).type('json').json({
            'docInfo': {
              'currentPage': 'accountActivation',
              'redirectTo': 'Home'
            },
            'success': 'registration'
          }))
        })
        .catch((error) => {
          console.log('create new user error: ', error)
        })
    }
  },

  /**
   * * func login
   * Handle login request..
   * return : object { uid, token }
  **/
  login: async (req, res) => {
    console.log('UsersCtrl func login')
    // console.log('UsersCtrl func login', req.body)

    const userMdl = new UsersMdl()
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.body.Login)
    const { Login, Password } = { ...req.body }
    // console.log(`login:${Login} and password:${Password}`)

    const response = await userMdl.getUser({
      Login: Login,
      Mail: Login // to connect with email address
    }, 'OR')
    console.log('login response ', response)

    if (Object.values(response).length !== 0 &&
    bcrypt.compareSync(Password, response[0].Password)) {
      // console.log('login response ', response[0].Password)

      if (response[0].UserToken !== 'activated' && response[0].UserToken !== 'disconnected') {
        return (res.status(401).type('json').json({
          error: 'bad authentification'
        }))
      }
      let r = response[0]
      r.UserToken = tokenUtil.genUserToken(r)
      userMdl.update({
        set: {
          UserToken: r.UserToken
        },
        where: {
          UserId: r.UserId
        }
      })
      delete r.Password

      // console.log('RESPONSE: ', r)
      return (res.status(201).type('json').json({
        success: true,
        msg: 'Login Ok',
        result: r
      }))
    } else {
      console.log('bad authentification')
      return (res.status(401).type('json').json({
        error: 'bad authentification'
      }))
    }
  },

  logout: async (req, res) => {
    const userMdl = new UsersMdl()
    console.log('UsersCtrl func logout')
    const { uid, token } = { ...req.body }
    console.log(`uid:${uid}, token:${token}`)
    const response = await userMdl.update({
      set: {
        UserToken: 'disconnected'
      },
      where: {
        UserId: uid
        // UserToken: token
      }
    }, 'OR')
    console.log('userLogout: ', response)
    if (response.affectedRows === 0) {
      return (res.status(401).type('json').json({
        'error': 'logout'
      }))
    }
    return (res.status(200).type('json').json({
      'success': 'logout'
    }))
  },

  accountActivation: async (req, res) => {
    // console.log("account activation.. ");
    const userMdl = new UsersMdl()
    console.log('0')
    if (!req.query.ul || !req.query.ua) {
      console.log('ERREUR: ', req.query.ul, '|', req.query.ua)
      res.status(403).type('json').json({
        'error': 'undefined required parameter'
      })
      return
    }
    const response = await userMdl.accountActive(req.query)
    console.log(`END response: `, response)
    console.log('---------------------')
    if (response.affectedRows !== 1) {
      res.status(401).type('json').json({
        // 'error': `Number of affected row incorrect = [${response.affectedRows}]`
        'error': `Wrong activation token`
      })
    } else if (response.affectedRows === 1) {
      res.status(201).redirect(serverConf.frontURL)
    } else {
      res.status(400).type('json').json({
        'error': 'unknown error'
      })
    }
  },

  resetAccountPassword: (req, res) => {
    console.log('reset account password')
  },

  /* eslint-disable */
  profilGetUser: async (req, res) => {
    console.log('get user profile')
    // console.log('req: ', req)
    // console.log('req.headers: ', req.headers)
    console.log('req.params: ', req.params)
    // console.log('req.body: ', req.body)
    // Todo -------------------------------------
    // Todo 1: verifier si l'id de l'user qui fait la demande
    // Todo 1: est le meme que celui du profile cons
    // Todo -------------------------------------

    const userMdl = new UsersMdl()
    userMdl.find({
      where: {
        UserId: req.params.uid,
        UserToken: req.params.token
      }
    })
      .then(async (response) => {
        if (Object.keys(response).length !== 0) {
          response = response[0]
          console.log('Response Raw: ', response)
          // * delete data to send for owner display
          delete response.Password
          delete response.Reported
          delete response.UserToken
          // delete response.Mail
          // delete response.GeolocAuth
          // delete response.BlockedUsers
          // response.LastName = String(response.LastName).slice(0, 1).concat('***').toUpperCase()

          // * add likes info
          const likesArr = await LikesCtrl.getUserLikes(response.UserId)
          response.Likes = likesArr

          console.log('Response After: ', response)
          return (res.status('201').type('json').json({
            success: true,
            msg: '',
            result: { ...response }
          }))
        } else {
          console.log('no user found')
          return (res.status('204').type('json').json({
            success: false,
            msg: 'No user found',
            result: { ...response }
          }))
        }
      })
  },

  profilUpdateUser: async (req, res) => {
    console.log('update user profil')
    // Todo -------------------------------------
    // Todo 2: implementer le chargement des images
    // Todo -------------------------------------
    // console.log('req.headers: ', req.headers)
    console.log('req.params: ', req.params)
    console.log('req.body: ', req.body)
    // console.log('-------------------------------')
    // ! voir pour arranger ca
    const { UserId, Login, FirstName,
      LastName, Age, Gender, Orientation, Bio,
      Interest, GeolocAuth, Height, Weight, EyeColor, HairColor } = { ...req.body.userData }
    const fields = {
      UserId: UserId,
      Login: Login,
      FirstName: FirstName,
      LastName: LastName,
      Age: Age,
      Gender: Gender,
      Orientation: Orientation,
      Bio: Bio,
      Interest: Interest,
      GeolocAuth: GeolocAuth,
      Height: Height,
      Weight: Weight,
      EyeColor: EyeColor,
      HairColor: HairColor
    }

    console.log('TEST: ', fields)
    // * Verif user input
    const verifTab = profilInputVerif(fields)
    if (Object.entries(verifTab).length !== 0) {
      console.log('UserCtrl > profilInputVerif[00]: ', verifTab)
      return (res.status(204).type('json').json({
        error: { ...verifTab }
      }))
    }

    const userMdl = new UsersMdl()
    const sqlRsp = await userMdl.update({
      set: {
        ...fields
      },
      where: {
        UserToken: req.body.token
      }
    })
    try {
      if (sqlRsp.affectedRows > 0) {
        console.log('update result: ', sqlRsp)
        return (res.status(201).type('json').json({
          success: 'profilUpdateUser',
          userState: {
            ...fields
          }
        }))
      } else {
        console.error('Error profileUpdateUser [01]: ', sqlRsp)
        return (res.status(500).type('json').json({
          error: 'Internal Server Error'
        }))
      }
    } catch (error) {
      console.error('Error profileUpdateUser [02]: ', error)
      return (res.status(500).type('json').json({
        error: 'Internal Server Error'
      }))
    }
  },

  // * no auth required
  checkLogin: async (req, res) => {
    console.log('checkLogin: ', req.body)
    console.log('checkLogin: ', req.body.Login)
    const userMdl = new UsersMdl()

    const sqlRep = await userMdl.find({
      where: {
        Login: req.body.Login
      }
    })
    var goNoGo
    console.log('sqlRep len', sqlRep.length)
    if (sqlRep.length < 1) {
      goNoGo = true
    } else {
      goNoGo = false
    }
    return (res.status('200').type('json').json({
      success: true,
      msg: 'Test en cours',
      result: { ret: goNoGo }
    }))
  },

  /* eslint-disable */
  // used trough socket
  setUserAsConnected: (payload) => {
    console.log('setUserAsConnected')
    const userMdl = new Models('Users')
    userMdl.update({
      set: {
        Connected: 1
      },
      where: {
        UserId: payload.uid,
        UserToken: payload.token
      }
    })
  },

  setUserAsDisconnected: (payload) => {
    console.log('setUserAsDisconnected')
    const userMdl = new Models('Users')
    userMdl.update({
      set: {
        Connected: 0
      },
      where: {
        UserId: payload.uid,
      }
    })
  }

}
