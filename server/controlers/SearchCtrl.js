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
        // console.log('-->', sqlRepPic[0].PicPath)
        // console.log('\n')
        return (sqlRepPic[0].PicPath)
      }
      return (null)
    }
  },

  getFiltered (req, res) {
    console.log('\n\n getFiltered ', req.body)
    const user = req.body.AUTH_USER

    // from search Panel
    // AgeMax, AgeMin, Distance

    // from userProfile
    // orientation, distance

    const where = {}
    // ! 0:Male 1:Female 2:QueerGender
    // ! 0:Heterosex 1:Bisex 2:Homosex 3:Pansex 4:Asex
    if (user.gender === 0) {// M
      if (user.Orientation === 0) {
        //je suis M et je cherche F
        // je cherche une F Hetero -> 1 - 0
        // je cherche une F Bi -> 1 - 1

      } else if (user.Orientation === 1) {
        // je suis M et je cherche M + F
        // je cherche un M homo -> 0 - 2
        // je cherche un M bi -> 0 - 1
        // je cherche une F Hetero -> 1 - 0
        // je cherche une F bi -> 1 - 1

      } else if (user.Orientation === 2) {
        // je suis M et je cherche M
        // je cherche un M homo -> 0 - 1
        // je cherche un M bi -> 0 - 2
      }
    } else if (user.gender === 1) {// F
      if (user.Orientation === 0) {
        //je suis F et je cherche M
        // je cherche un M Hetero -> 0 - 0
        // je cherche un M Bi -> 0 - 1
      } else if (user.Orientation === 1) {
        // je suis F et je cherche M + F
        // je cherche un F homo -> 1 - 2
        // je cherche un F bi -> 1 - 1
        // je cherche une M Hetero -> 0 - 0
        // je cherche une M bi -> 0 - 1
        
      } else if (user.Orientation === 2) {
        // je suis F et je cherche F
        // je cherche une F homo -> 1 - 1
        // je cherche une F bi -> 1 - 2
      } else if (user.gender === 3) {
        // ! TODO how to handle this..??
      }
    }





    return (res.status('200').type('json').json({
      success: true,
      msg: 'TEST',
      result: { }
    }))
  },










}

export { SearchCtrl }
