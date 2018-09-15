
import serverConf from '../config/server'
import Models from './Models'
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const sendNewUserMailConfirmation = (login, mail, hash) => {
  // on slice pour enlever les '
  // login = login.slice(1, login.length - 1)
  // mail = mail.slice(1, mail.length - 1)

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'at3zlg34yxvbmwov@ethereal.email',
      pass: 'vSnBXEd1MZDvvcp4tQ'
    }
  })
  let htmlMsg = (`<h2>Hey ${login} </h2>\r\n`)
  htmlMsg += (`Your subsciption process is about to end.. `)
  htmlMsg += (`<p>To confirme your email adress click <a href='`)
  htmlMsg += (`http://localhost:${serverConf.serverPORT}/api/users/accountActivation/?ul=${login}&ua=${hash}`)
  htmlMsg += (`'><span>HERE</span></a></p>\r\n`)
  console.log('MAIL PREVIEW:', htmlMsg)
  const mailOption = {
    from: 'admin@matcha.fr',
    to: 'galy@student.42.fr',
    subject: 'email confirmation',
    html: htmlMsg
  }
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.error('Mail error: ', err)
      return
    }
    console.log(`Mail sent info: \n`, info)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  })
}

export default class UsersMdl extends Models {
  // constructor () {
  //   super()
  //   // console.log('constructor class UsersMdl')
  // }

  async createNewUser (login, mail, password) {
    // console.log('Values:\n', values)
    console.log(`params ${login}, ${mail}, ${password}`)

    let timestamp = new Date().getTime()
    let token = ''
    token.concat(timestamp, mail)
    // console.log('CONCAT'', concat, ''')

    const salt = bcrypt.genSaltSync(10)
    const passHashed = bcrypt.hashSync(password, salt)
    const tokenHashed = bcrypt.hashSync(token, salt)
    const values = {
      where: {
        Login: login,
        Mail: mail,
        Password: passHashed,
        UserToken: tokenHashed
      }
    }
    const response = await this.insert(values)
    sendNewUserMailConfirmation(login, mail, tokenHashed)
    return (response)
  }

  async accountActive (params) {
    console.log('start ', params)
    const response = await this.update({
      set: {
        UserToken: 'activated'
      },
      where: {
        Login: params.ul,
        UserToken: params.ua
      }
    })
    // console.log('+accountActive response: ', response)
    // console.log('---------------------')
    return (response)
  }

  async getUser (params) {
    var wrapper = {}
    Object.entries(params).forEach(
      ([key, val]) => {
        wrapper[key] = val
      })
    console.log('wrapper: ', wrapper)
    const response = await this.find({
      where: wrapper
    })
    return (response)
  }
}

// export default class UsersMdl
