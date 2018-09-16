
import UsersMdl from '../models/UsersMdl'
import bcrypt from 'bcrypt'
import tokenUtil from '../utils/token_util'

const usersFuncs = {
  inputsVerifs: (params) => {
    let retTab = {
      verifLogin: true,
      verifMail: true,
      verifPassword: true,
      veriFirstName: true,
      verifLastName: true
    }
    const regexMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    // regexPassword for mini 8chars 1alpha 1num
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (params.login === '' || params.login.length < 2 || params.login.length > 25) {
      retTab.verifLogin = false
    }
    if (params.mail === '' || !regexMail.test(params.mail) || params.mail.length > 100) {
      retTab.verifMail = false
    }
    if (params.password === '' || !regexPassword.test(params.password) || params.password.length > 100) {
      retTab.verifPassword = false
    }
    if (params.firstName === '' || params.firstName.length < 2 || params.firstName.length > 60) {
      retTab.verifFirstName = false
    }
    if (params.lastName === '' || params.lastName.length < 2 || params.lastName.length > 60) {
      retTab.verifLastName = false
    }
    return (retTab)
  }
}

exports.UsersCtrl = {
  registerNewUser: async (req, res) => {
    console.log('UsersCtrl func register')

    // recup / verif des donnees
    let params = { ...req.body }
    console.log('PARAMS: ', params)
    const retTab = usersFuncs.inputsVerifs(params)
    for (let elem in retTab) {
      // console.log(`retTab.elem={${retTab[elem]}}`)
      if (!retTab[elem]) {
        return (res.status(400).type('json').json({ error: {
          login: retTab.verifLogin,
          mail: retTab.verifMail
        } }))
      }
    }

    const userMdl = new UsersMdl()
    // test if login or mail already exists
    const response = await userMdl.find({
      where: {
        Login: params.login,
        Mail: params.mail
      }
    }, 'OR')
    console.log('find response0 ', response)

    if (response.length !== 0) {
      let error = {}
      if (response[0].Login === params.login) {
        console.log('On passe ici')
        error[params.login] = 'used'
      }
      if (response[0].Mail === params.mail) {
        console.log('On passe la')
        error[params.mail] = 'used'
      }
      console.log('TEST ERRROR: ', error)
      return (res.status(400).type('json').json({ error }))
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
            'Success': 'new user registered'
          }))
        })
        .catch((error) => {
          console.log('create new user error: ', error)
        })
    }
  },

  login: async (req, res) => {
    console.log('UsersCtrl func login')
    const userMdl = new UsersMdl()
    const { login, password } = { ...req.body }
    console.log(`login:${login} and password:${password}`)

    const response = await userMdl.getUser({
      Login: login,
      Mail: login // to connect with email address
    }, 'OR')
    console.log('login response ', response)

    if (Object.values(response).length !== 0 &&
    bcrypt.compareSync(password, response[0].Password)) {
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
      return (res.status(201).type('json').json({
        'success': 'login ok',
        'userState': {
          uid: r.UserId,
          token: r.UserToken
        }
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
        UserId: uid,
        UserToken: token
      }
    })
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
      res.status(400).type('json').json({
        'error': 'undefined required parameter'
      })
      return
    }
    const response = await userMdl.accountActive(req.query)
    console.log(`END response: `, response)
    console.log('---------------------')
    if (response.affectedRows !== 1) {
      res.status(400).type('json').json({
        'error': `Number of affected row incorrect = [${response.affectedRows}]`
      })
    } else if (response.affectedRows === 1) {
      res.status(201).type('json').json({
        'paramReceived': {
          'ul': req.query.ul,
          'ua': req.query.ua
        },
        'docInfo': {
          'currentPage': 'accountActivation',
          'redirectTo': 'Home'
        },
        'success': {

        },
        'userState': {
          'login': 'true',
          'usrId': '',
          'userToken': ''
        }
      })
    } else {
      res.status(400).type('json').json({
        'error': 'unknown error'
      })
    }
  },

  resetAccountPassword: (req, res) => {
    console.log('reset account password')
    
  },

  getUserProfil: (req, res) => {

    console.log('get user profil1: ', req.headers)
    console.log('get user profil2: ', req.headers['x-forwarded-for'])
    console.log('get user profil31: ', req.connection)
    console.log('get user profil32: ', req.connection.remoteAddress)
    console.log('get user profil41: ', req.socket)
    console.log('get user profil42: ', req.socket.remoteAddress)
    console.log('get user profil51: ', req.connection.socket)
    console.log('get user profil52: ', req.connection.socket.remoteAddress)


  },

  updateUserProfil: (req, res) => {
    console.log('update user profil')

  }
}
