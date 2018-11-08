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
      sqlRepUsr[id].PicPath = truc
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
    const filters = req.body.filters

    // ! mep de la requete non terminee
    if (filters.Gender.indexOf(true) !== -1 || filters.Orientation.indexOf(true) !== -1) {
      console.log('\nCustom filters (Gender / Orientation):')
      console.log(`${filters.Gender}\n${filters.Orientation}\n`)

      // override the basic search params
      let sqlReq = `SELECT `
      sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain `)
      sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC `)

      filters.Gender.forEach((val, key) => {
        if (filters.Gender[key]) {
          sqlReq = sqlReq.concat(`WHERE (USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender=\'${key}\' `)

          if (filters.Orientation.indexOf(true) !== -1) {
            sqlReq = sqlReq.concat('AND (')
            filters.Orientation.forEach((val, key) => {
              if (filters.Orientation[key]) {
                sqlReq = sqlReq.concat(`USR.Orientation='${key}' `)
              }
            })
            sqlReq = sqlReq.concat(') ')
          }
        }
      })
      // sqlReq = sqlReq.concat(`WHERE (USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender='1' AND (USR.Orientation='1' OR USR.Orientation='2')) `)
      console.log('REQ: ', sqlReq)
      return
    }

    // recup des geoloc data du user pour les injecter dans la func de calcule de distance
    const geolocMdl = new Models('Geolocation')
    let userGeolocData = await geolocMdl.find({
      where: {
        Owner: req.body.AUTH_USER.UserId
      }
    })
    userGeolocData = userGeolocData[0]
    console.log('\n USER GEOLOC DATA', userGeolocData)
    var coordsUser = [userGeolocData.Latitude, userGeolocData.Longitude]
    console.log('\n coordsUser', coordsUser)
    

    let {reqRep, msg} = await __basicFilteredRequests(user)

    
    // console.log('\n retour de la requete test', reqRep)
    reqRep.forEach(elem => {
      elem.Distance = __calculateDistance(coordsUser, [elem.Latitude, elem.Longitude])
    });
    
    // console.log('\n retour de la requete test', reqRep)
    return (res.status('200').type('json').json({
      success: true,
      msg: msg,
      result: { ...reqRep }
    }))
  },

}

export { SearchCtrl }

// Internal functions

function __calculateDistance (coordsUser = [], coordsTarget = []) {
  if (coordsUser[0] === coordsTarget[0] && coordsUser[1] === coordsTarget[1]) {
    return (0)
  }

  if (coordsUser[0] < 0 || coordsUser[1] < 0) {
    console.log('\x1b[31m ERROR[001]: __calculateDistance.. handle les negatifs \x1b[0m')
  } else if (coordsTarget[0] < 0 || coordsTarget[1] < 0) {
    console.log('\x1b[31m ERROR[002]: __calculateDistance.. handle les negatifs \x1b[0m')
  }

  // console.log(`coordsUser`, coordsUser)
  // console.log(`coordsTarget`, coordsTarget)  
  const coordsUserRad = coordsUser.map((deg) => {
    return (deg * (Math.PI / 180))
  })
  const coordsTargetRad = coordsTarget.map((deg) => {
    return (deg * (Math.PI / 180))
  })
  // console.log(` RADcoordsUser`, coordsUserRad)
  // console.log(` RADcoordsTarget`, coordsTargetRad)
  const R = 6367445 // constante - rayon de la terre
  const tmp = Math.sin(coordsUserRad[0]) * Math.sin(coordsTargetRad[0]) + Math.cos(coordsUserRad[0]) *
  Math.cos(coordsTargetRad[0]) * Math.cos(coordsTargetRad[1] - coordsUserRad[1])
  const res = Math.round((R * Math.acos(tmp)) / 1000)
  // console.log(`computed result ${res} \n`)
  return (res)
}

async function __basicFilteredRequests (user) {
  let reqRep = undefined
  let msg = 'Nothing...'
  // ! 0:Male 1:Female 2:QueerGender
  // ! 0:Heterosex 1:Bisex 2:Homosex 3:Pansex 4:Asex
  if (user.Gender === 0) {// M
    if (user.Orientation === 0) {
      console.log('\n\n1----Req_Male_Hetero')
      msg = 'Request for Male_Hetero'
      // je suis M et je cherche F // je cherche une F Hetero -> 1 - 0 // F Bi -> 1 - 1
      reqRep = await SearchMdl.Req_Male_Hetero()
    } else if (user.Orientation === 1) {
      console.log('\n\n1----Req_Male_Bi')
      msg = 'Request for Male_Bi'
      // je suis M et je cherche M + F // je cherche un M homo -> 0 - 2 // M bi -> 0 - 1 // F Hetero -> 1 - 0 // F bi -> 1 - 1
      reqRep = await SearchMdl.Req_Male_Bi()
    } else if (user.Orientation === 2) {
      console.log('\n\n1----Req_Male_Homo')
      msg = 'Request for Male_Homo'
      // je suis M et je cherche M // je cherche un M homo -> 0 - 1 // M bi -> 0 - 2
      reqRep = await SearchMdl.Req_Male_Homo()
    }
  } else if (user.Gender === 1) {// F
    if (user.Orientation === 0) {
      console.log('\n\n1----Req_Fem_Hetero')
      msg = 'Request for Fem_Hetero'
      // je suis F et je cherche M // je cherche un M Hetero -> 0 - 0 // M Bi -> 0 - 1
      reqRep = await SearchMdl.Req_Fem_Hetero()
    } else if (user.Orientation === 1) {
      console.log('\n\n1----Req_Fem_Bi')
      msg = 'Request for Fem_Bi'
      // je suis F et je cherche M + F // je cherche un F homo -> 1 - 2 // un F bi -> 1 - 1 // une M Hetero -> 0 - 0 // une M bi -> 0 - 1
      reqRep = await SearchMdl.Req_Fem_Bi()

    } else if (user.Orientation === 2) {
      console.log('\n\n1----Req_Fem_Homo')
      msg = 'Request for Fem_Homo'
      // je suis F et je cherche F // je cherche une F homo -> 1 - 1 // je cherche une F bi -> 1 - 2
      reqRep = await SearchMdl.Req_Fem_Homo()
    } else if (user.gender === 3) {
      // ! TODO how to handle this..??
    }
  }
  return ({reqRep, msg})
}
