// IMPORT
import Models from '../models/Models'
import UsersMdl from '../models/UsersMdl'
import fs from 'fs'

// CONST
const FILENAME = __filename.replace(`${__dirname}/`, '')
const NBR_MAX_PIC = 5
//

export class PicturesCtrl {
  constructor () {
    this.usersMdl = new Models('Users')
    this.picturesMdl = new Models('Pictures')
  }
  setMainPicture () {
    console.log('setMainPicture')
  }

  /* eslint-disable */
  async getAllPicture (req, res) {
    console.log('getAllPicture', req.body)

    const picturesMdl = new Models('Pictures')
    const result = await picturesMdl.find({
      where: {
        PicOwner: req.body.AUTH_USER.UserId
      }
    })
    console.log('sql return:', result)
    let picsAddr = []
    let mainPicNum = -1
    Object.entries(result).forEach(([key, val]) => {
      console.log('--> ', key, ' - ', val)
      picsAddr.push(val.PicPath)
      if (val.IsMain != 0) {
        mainPicNum = key
      }
      console.log('picsAddr: ', picsAddr)
      
    });
    let dataToSend = {
      picsAddr: picsAddr
    }
    return (res.status('200').type('json').json({
      success: true,
      msg: '',
      result: {
        picsAddr: picsAddr,
        mainPicNum: mainPicNum
      }
    }))
  }

  async addNewPicture (req, res) {
    console.log('addNewPicture')
    // console.log('addNewPicture', req.body)
    // console.log('addNewPicture')
    const userMdl = new UsersMdl()
    let rspUserData = await userMdl.find({
      where: {
        UserToken: req.body.token
      }
    })
    rspUserData = rspUserData[0]
    const userDir = `./UsersStorage/User_${rspUserData.UserId}_${rspUserData.Login}`
    try {

      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, '0772')
      }
    } catch (error) {
      console.error(`Error[01] in ${FILENAME} - addNewPicture: `, error)
      return (res.status('500').type('json').json({
        error: 'error'
      }))
    }

    let picName = 'profilePic_0'
    let fd = -1
    let newPicPath = null
    for (let i = 0; i < NBR_MAX_PIC; i++) {
      newPicPath = `${userDir}/${picName}${i}.jpg`
      if (!fs.existsSync(newPicPath)) {
        if ((fd = fs.openSync(newPicPath, 'w', )) < 0) {
          console.error(`Error[02] in ${FILENAME} - addNewPicture: impossible de creer le ficher`)
          return (res.status('500').type('json').json({
            error: 'error'
          }))
        } else {
          // i = NBR_MAX_PIC + 1
          break
        }
      } else if (i === 4) {
        newPicPath = null
        console.log('trop de fichiers..')
        return (res.status('403').type('json').json({
          error: 'error: too many pictures'
        }))
      }
    }
    // console.log('FD: ', fd)
    console.log('newPicPath: ', newPicPath)

    const picBuf = new Buffer.from(req.body.rawData.replace('data:image/jpeg;base64,', ''), 'base64')
    fs.writeSync(fd, picBuf)    
    fs.closeSync(fd)
    
    const PicturesMdl = new Models('Pictures')
    // entrer le chemin en base
    const sqlRep = await PicturesMdl.insert({
      where: {
        PicPath: newPicPath,
        PicOwner: rspUserData.UserId
      }
    })
    console.log('sqlRep: ',)
  }

  removePicture () {
    console.log('removePicture')
    // remove le chemin de la photo en base
    // remove de la photo dans le dossier utilisateur
  }
}
