// IMPORT
import Models from '../models/Models'
import UsersMdl from '../models/UsersMdl'
import fs from 'fs'

// CONST
const FILENAME = __filename.replace(`${__dirname}/`, '')
const NBR_MAX_PIC = 5
//

export class PicturesCtrl {
  async setMainPicture (req, res) {
    console.log('setMainPicture', req.body)
    const userMdl = new Models('Pictures')

    // reset all pic MainFlag to 0
    let sqlRep = await userMdl.update({
      set: {
        IsMain: 0
      },
      where: {
        PicOwner: req.body.AUTH_USER.UserId
      }
    })
    // set main pic flag
    sqlRep = await userMdl.update({
      set: {
        IsMain: 1
      },
      where: {
        PicPath: req.body.mainPicName
      }
    })
    return (res.status('200').type('json').json({
      success: true,
      msg: '',
      result: {}
    }))
    // console.log('sqlRep: ', sqlRep)
  }

  async getAllPicture (req, res) {
    console.log('getAllPicture')
    // console.log('getAllPicture', req.body)

    const picturesMdl = new Models('Pictures')
    const result = await picturesMdl.find({
      where: {
        PicOwner: req.body.AUTH_USER.UserId
      }
    })
    console.log('Sql Return:', result)
    let picsAddr = []
    let mainPicNum = -1

    if (result.length !== 0) {
      // console.log('result.length:', result.length)
      Object.entries(result).forEach(([key, val]) => {
        // console.log('--> ', key, ' - ', val)
        picsAddr.push(val.PicPath)
        if (val.IsMain !== 0) {
          mainPicNum = key
        }
        // console.log('picsAddr: ', picsAddr)
      })
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
    // console.log('addNewPicture', req.body.IsMain)
    // console.log('addNewPicture')
    const userMdl = new UsersMdl()
    let rspUserData = await userMdl.find({
      where: {
        UserToken: req.body.AUTH_USER.UserToken
      }
    })
    rspUserData = rspUserData[0]
    const registerDir = `./UsersStorage/User_${rspUserData.UserId}_${rspUserData.Login}`
    try {
      if (!fs.existsSync(registerDir)) {
        fs.mkdirSync(registerDir, '0772')
      }
    } catch (error) {
      console.error(`Error[01] in ${FILENAME} - addNewPicture: `, error)
      return (res.status('400').type('json').json({
        error: 'error'
      }))
    }

    let picName = 'profilePic_0'
    let fd = -1
    let newPicPath = null
    for (let i = 0; i < NBR_MAX_PIC; i++) {
      newPicPath = `${registerDir}/${picName}${i}.jpg`
      if (!fs.existsSync(newPicPath)) {
        if ((fd = fs.openSync(newPicPath, 'w')) < 0) {
          console.error(`Error[02] in ${FILENAME} - addNewPicture: impossible de creer le ficher`)
          return (res.status('400').type('json').json({
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

    /* eslint-disable-next-line */
    const picBuf = new Buffer.from(req.body.rawData.replace('data:image/jpeg;base64,', ''), 'base64')
    fs.writeSync(fd, picBuf)
    fs.closeSync(fd)

    const PicturesMdl = new Models('Pictures')
    // entrer le chemin en base
    // const servDir = `/public/User_${rspUserData.UserId}_${rspUserData.Login}`
    const servDir = newPicPath.replace('./UsersStorage/', '/public/')
    const sqlRep = await PicturesMdl.insert({
      where: {
        PicPath: servDir,
        PicOwner: rspUserData.UserId,
        IsMain: req.body.IsMain
      }
    })
    console.log('sqlRep: ', sqlRep)
    if (sqlRep.affectedRows === 1) {
      return (res.status('201').type('json').json({
        success: true,
        msg: 'Picture created successfully',
        result: {
          newPicAddr: servDir
        }
      }))
    }
  }

  async removePicture (req, res) {
    console.log('removePicture', req.body)
    if (req.body.rmPic === undefined) {
      return (res.status('400').type('json').json({
        success: false,
        msg: 'No picture deleted for... some obscure reason',
        result: {}
      }))
    }
    // remove la photo
    const picPath = req.body.rmPic.replace('/public/', './UsersStorage/')
    fs.unlinkSync(picPath) // unlink return undefined so it's always ok :)

    // remove le chemin de la photo en base
    const picturesMdl = new Models('Pictures')
    const sqlRep = await picturesMdl.delete({
      where: {
        PicOwner: req.body.AUTH_USER.UserId,
        PicPath: req.body.rmPic
        // PicPath: '/public/User_143_jonny/profilePic_01.jpg'
      }
    })
    console.log('removePicture sqlRep: ', sqlRep)
    console.log('removePicture sqlRep: ', sqlRep.affectedRows)
    if (sqlRep.affectedRows === 1) {
      return (res.status('200').type('json').json({
        success: true,
        msg: 'Picture deleted successfully',
        result: {}
      }))
    } else {
      return (res.status('400').type('json').json({
        success: false,
        msg: 'No picture deleted for... some obscure reason',
        result: {}
      }))
    }
  }
}
