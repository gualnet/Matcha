
import UsersMdl from '../models/UsersMdl'

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
    // const login = req.body.login
    // const mail = req.body.mail
    // const password = req.body.password
    const { login, mail, password } = { ...req.body }
    // console.log("login: ", login, "\nmail: ", mail, "\npassword:", password, "\n")

    const retTab = usersFuncs.inputsVerifs(login, mail, password)
    for (let elem in retTab) {
      // console.log(`retTab.elem={${retTab[elem]}}`)
      if (!retTab[elem]) {
        return (res.status(400).type('json').json({ error: { ...retTab } }))
      }
    }

    const userMdl = new UsersMdl()
    // test if login or mail already exists
    const response = await userMdl.find({
      where: {
        Login: login,
        Mail: mail
      }
    })
    console.log('find response ', response)
    if (response.length !== 0) {
      let error = {}
      if (response[0].login === login) {
        error[login] = 'used'
      }
      if (response[0].mail === mail) {
        error[mail] = 'used'
      }
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
    // password = 'truc'
    console.log(`login:${login} and password:${password}`)

    // Todo: verif login/password
    const response = await userMdl.getUser({
      Login: login,
      Password: password
    })
    console.log('login response ', response)
    console.log('login response key ', Object.keys(response).length)
    if (Object.values(response).length !== 0) {

    } else {
      console.log('bad authentification')
      return (res.status(401).type('json').json({
        error: 'bad authentification'
      }))
    }

    // Todo: generate token

    return (res.status(400).type('json').json({
      'error': 'BOOOOOOOOOOU'
    }))
  },

  logout: (req, res) => {
    console.log('UsersCtrl func logout')
    return (res.type('json').json({
      'test': 'login'
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
