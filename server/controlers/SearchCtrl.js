// IMPORT
import Models from '../models/Models'

/* eslint-disable */
const SearchCtrl = {

  async getAllMembers (req, res) {
    const userMdl = new Models('Users')
    const picturesMdl = new Models('Pictures')

    let sqlRepUsr = await userMdl.findAll()

    sqlRepUsr.map((item) => {
      delete item.UserToken
      delete item.Password
      delete item.Mail
      delete item.Bio
      delete item.BlockedUsers
      delete item.Reported
    })

    for (let id in sqlRepUsr) {
      const truc = await getItemMainPic(sqlRepUsr[id].UserId)
      console.log('truc', truc)
      sqlRepUsr[id].MainPic = truc
    }

    
    

    console.log('sqlRepUsr', sqlRepUsr[2])







    return (res.status('200').type('json').json({
      success: true,
      msg: 'ok',
      result: { ...sqlRepUsr }
    }))

    async function getItemMainPic (UserId) {
      let sqlRepPic = await picturesMdl.find({
        where: {
          PicOwner: UserId,
          IsMain: 1
        }
      })
      if (sqlRepPic[0] != undefined) {
        console.log('3-->', sqlRepPic[0].PicPath)
        console.log('\n')
        return (sqlRepPic[0].PicPath)
      }
      return (null)
    }
  }












}

export { SearchCtrl }
