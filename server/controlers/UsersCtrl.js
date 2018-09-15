
import UsersMdl from '../models/UsersMdl'
import bcrypt from 'bcrypt'
import tokenUtil from '../utils/token_util'

const usersFuncs = {
  inputsVerifs: (login = '', mail = '', password = '') => {
    let retTab = {
      verifLogin: true,
      verifMail: true,
      verifPassword: true
    }
    const regexMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    // regexPassword for mini 8chars 1alpha 1num
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (login === '' || login.length < 2 || login.length > 60) {
      retTab.verifLogin = false
    }
    if (mail === '' || !regexMail.test(mail) || mail.length > 250) {
      retTab.verifMail = false
    }
    if (password === '' || !regexPassword.test(password) || password.length > 250) {
      retTab.verifPassword = false
    }
    return (retTab)
  }
}

exports.UsersCtrl = {
  registerNewUser: async (req, res) => {
    console.log('UsersCtrl func register')

    // recup / verif des donnees
    const { login, mail, password } = { ...req.body }
    // console.log("login: ", login, "\nmail: ", mail, "\npassword:", password, "\n")
    const retTab = usersFuncs.inputsVerifs(login, mail, password)
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
        Login: login,
        Mail: mail
      }
    }, 'OR')
    console.log('find response0 ', response)

    if (response.length !== 0) {
      let error = {}
      if (response[0].Login === login) {
        console.log('On passe ici')
        error[login] = 'used'
      }
      if (response[0].Mail === mail) {
        console.log('On passe la')
        error[mail] = 'used'
      }
      console.log('TEST ERRROR: ', error)
      return (res.status(400).type('json').json({ error }))
    } else {
      // Creation du nouvel utilisateur
      userMdl.createNewUser(login, mail, password)
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
  }
}
