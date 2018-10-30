// IMPORT
import Models from '../models/Models'
import SearchMdl from '../models/SearchMdl'

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

  async getFiltered (req, res) {
    console.log('\n\n getFiltered ', req.body)
    const user = req.body.AUTH_USER

    
    let reqRep = undefined
    let msg = 'Nothing...'
    
    // ! 0:Male 1:Female 2:QueerGender
    // ! 0:Heterosex 1:Bisex 2:Homosex 3:Pansex 4:Asex
    if (user.Gender === 0) {// M
      if (user.Orientation === 0) {
        console.log('\n\n1----Req_Male_Hetero')
        msg = 'Request for Male_Hetero'
        // je suis M et je cherche F
        // je cherche une F Hetero -> 1 - 0
        // je cherche une F Bi -> 1 - 1

        // gender=1 - orientation=0-1
        reqRep = await SearchMdl.Req_Male_Hetero()
      } else if (user.Orientation === 1) {
        console.log('\n\n1----Req_Male_Bi')
        msg = 'Request for Male_Bi'
        // je suis M et je cherche M + F
        // je cherche un M homo -> 0 - 2
        // je cherche un M bi -> 0 - 1
        // je cherche une F Hetero -> 1 - 0
        // je cherche une F bi -> 1 - 1

        // gender=0 - orientation=1-2
        // gender=1 - orientation=0-1
        reqRep = await SearchMdl.Req_Male_Bi()
      } else if (user.Orientation === 2) {
        // je suis M et je cherche M
        console.log('\n\n1----Req_Male_Homo')
        msg = 'Request for Male_Homo'
        // je cherche un M homo -> 0 - 1
        // je cherche un M bi -> 0 - 2

        // gender=0 - orientation=1-2
        reqRep = await SearchMdl.Req_Male_Homo()
      }
    } else if (user.Gender === 1) {// F
      if (user.Orientation === 0) {
        console.log('\n\n1----Req_Fem_Hetero')
        msg = 'Request for Fem_Hetero'
        // je suis F et je cherche M
        // je cherche un M Hetero -> 0 - 0
        // je cherche un M Bi -> 0 - 1

        //gender=0 - orientation=0-1
        reqRep = await SearchMdl.Req_Fem_Hetero()
      } else if (user.Orientation === 1) {
        // je suis F et je cherche M + F
        console.log('\n\n1----Req_Fem_Bi')
        msg = 'Request for Fem_Bi'
        // je cherche un F homo -> 1 - 2
        // je cherche un F bi -> 1 - 1
        // je cherche une M Hetero -> 0 - 0
        // je cherche une M bi -> 0 - 1

        // gender=1 - orientation=1-2
        // gender=0 - orientation=0-1
        reqRep = await SearchMdl.Req_Fem_Bi()

      } else if (user.Orientation === 2) {
        // je suis F et je cherche F
        console.log('\n\n1----Req_Fem_Homo')
        msg = 'Request for Fem_Homo'
        // je cherche une F homo -> 1 - 1
        // je cherche une F bi -> 1 - 2

        reqRep = await SearchMdl.Req_Fem_Homo()
      } else if (user.gender === 3) {
        // ! TODO how to handle this..??
      }
    }




    console.log('\n retour de la requete test', reqRep)
    return (res.status('200').type('json').json({
      success: true,
      msg: msg,
      result: { ...reqRep }
    }))
  },










}

export { SearchCtrl }
