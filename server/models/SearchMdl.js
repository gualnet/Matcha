
import pool from '../utils/database'
// import Models from '../models/Models'

/* eslint-disable */

const SearchMdl = {
  async Req_Male_Hetero () {
    let sqlReq = `SELECT `
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain, Latitude, Longitude `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC , Geolocation AS GEO `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId AND PIC.IsMain='1' `)
    sqlReq = sqlReq.concat(`AND USR.Gender='1' AND (USR.Orientation='0' OR USR.Orientation='1') `)
    sqlReq = sqlReq.concat(`ORDER BY Popularity;`)

    try {
      const sqlRep = await pool.query(sqlReq)
      return (sqlRep)

    } catch (error) {
      console.error('ERROR in \'func Req_Male_Hetero\' : ', error)
    }
    return (undefined)
  },

  async Req_Fem_Hetero () {
    let sqlReq = `SELECT `
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain, Latitude, Longitude `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC , Geolocation AS GEO `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId AND PIC.IsMain='1' `)
    sqlReq = sqlReq.concat(`AND USR.Gender='0' AND (USR.Orientation='0' OR USR.Orientation='1') `)
    sqlReq = sqlReq.concat(`ORDER BY Popularity;`)

    try {
      const sqlRep = await pool.query(sqlReq)
      return (sqlRep)

    } catch (error) {
      console.error('ERROR in \'func Req_Male_Hetero\' : ', error)
    }
    return (undefined)
  },

  async Req_Male_Bi () {
    let sqlReq = `SELECT `
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain, Latitude, Longitude `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC , Geolocation AS GEO `)
    sqlReq = sqlReq.concat(`WHERE (USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender='0' AND (USR.Orientation='1' OR USR.Orientation='2')) `)
    sqlReq = sqlReq.concat(`OR (USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId  And PIC.IsMain='1' AND USR.Gender='1' AND (USR.Orientation='0' OR USR.Orientation='1')) `)
    sqlReq = sqlReq.concat(`ORDER BY Popularity;`)

    console.log('sqlReq: ', sqlReq)

    try {
      const sqlRep = await pool.query(sqlReq)
      return (sqlRep)
    } catch (error) {
      console.error('ERROR in \'func Req_Male_Bi\' : ', error)
    }
    return (undefined)
  },

  async Req_Fem_Bi () {
    let sqlReq = `SELECT `
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain, Latitude, Longitude `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC , Geolocation AS GEO `)
    sqlReq = sqlReq.concat(`WHERE (USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender='1' AND (USR.Orientation='1' OR USR.Orientation='2')) `)
    sqlReq = sqlReq.concat(`OR (USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender='0' AND (USR.Orientation='0' OR USR.Orientation='1')) `)
    sqlReq = sqlReq.concat(`ORDER BY Popularity;`)

    console.log('sqlReq: ', sqlReq)

    try {
      const sqlRep = await pool.query(sqlReq)
      return (sqlRep)
    } catch (error) {
      console.error('ERROR in \'func Req_Male_Bi\' : ', error)
    }
    return (undefined)
  },

  async Req_Male_Homo () {
    let sqlReq = `SELECT `
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain, Latitude, Longitude `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC , Geolocation AS GEO `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender='0' AND (USR.Orientation='1' OR USR.Orientation='2') `)
    sqlReq = sqlReq.concat(`ORDER BY Popularity;`)
    
    console.log('sqlReq: ', sqlReq)

    try {
      const sqlRep = await pool.query(sqlReq)
      return (sqlRep)
    } catch (error) {
      console.error('ERROR in \'func Req_Male_Homo\' : ', error)
    }
    return (undefined)
  },

  async Req_Fem_Homo () {
    let sqlReq = `SELECT `
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain, Latitude, Longitude `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC, Geolocation AS GEO `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender='1' AND (USR.Orientation='1' OR USR.Orientation='2') `)
    sqlReq = sqlReq.concat(`ORDER BY Popularity;`)
    
    console.log('sqlReq: ', sqlReq)

    try {
      const sqlRep = await pool.query(sqlReq)
      return (sqlRep)
    } catch (error) {
      console.error('ERROR in \'func Req_Male_Homo\' : ', error)
    }
    return (undefined)
  },

  async customFilteredRequest (user, filters) {
    const occurCount = (Arr) => {
      let counter = 0
      Arr.forEach((val, key) => {
        if (val === true) {
          counter++
        }
      })
      return (counter)
    }
    // console.log('OCCUR1', occurCount(filters.Gender))
    // console.log('OCCUR2', occurCount(filters.Orientation))

    let sqlReq = `SELECT `
      sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain, Latitude, Longitude `)
      sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC , Geolocation AS GEO `)

      if (occurCount(filters.Gender) > 1) {
        sqlReq = sqlReq.concat(`WHERE `)
        filters.Gender.forEach((val, key) => {
          if (val === true) {
              sqlReq = sqlReq.concat(`(USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender=\'${key}\'`)
            if (filters.Orientation.indexOf(true) !== -1 && occurCount(filters.Orientation) > 1) {
              sqlReq = sqlReq.concat(' AND (')
              filters.Orientation.forEach((val, key) => {
                if (filters.Orientation[key]) {
                  sqlReq = sqlReq.concat(`USR.Orientation='${key}' OR `)
                }
              })
              sqlReq = sqlReq.concat('-')
              sqlReq = sqlReq.replace('OR -', '')
              sqlReq = sqlReq.concat(') ')
            } else if (filters.Orientation.indexOf(true) !== -1) {
              sqlReq = sqlReq.concat(`AND (USR.Orientation='${filters.Orientation.indexOf(true)}') `)
            }
            sqlReq = sqlReq.concat(`) AND `)
          }
        })
        sqlReq = sqlReq.concat('-').replace(' ) AND -', ')')
      } else if (occurCount(filters.Gender) === 1){
        sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender=\'${filters.Gender.indexOf(true)}\' `)

        if (filters.Orientation.indexOf(true) !== -1 && occurCount(filters.Orientation) > 1) {
          sqlReq = sqlReq.concat('AND (')
          filters.Orientation.forEach((val, key) => {
            if (filters.Orientation[key]) {
              sqlReq = sqlReq.concat(`USR.Orientation='${key}' OR `)
            }
          })
          sqlReq = sqlReq.concat('-').replace(' OR -', '').concat(') ')
        } else if (filters.Orientation.indexOf(true) !== -1) {
          sqlReq = sqlReq.concat(`AND (USR.Orientation='${filters.Orientation.indexOf(true)}') `)
        }
      } else {
        // case where filtered gender = -1
        sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND GEO.Owner=USR.UserId And PIC.IsMain='1' AND USR.Gender=\'${user.Gender}\' `)
        if (filters.Orientation.indexOf(true) !== -1 && occurCount(filters.Orientation) > 1) {
          sqlReq = sqlReq.concat('AND (')
          filters.Orientation.forEach((val, key) => {
            if (filters.Orientation[key]) {
              sqlReq = sqlReq.concat(`USR.Orientation='${key}' OR `)
            }
          })
          sqlReq = sqlReq.concat('-').replace(' OR -', '').concat(') ')
        } else if (filters.Orientation.indexOf(true) !== -1) {
          sqlReq = sqlReq.concat(`AND (USR.Orientation='${filters.Orientation.indexOf(true)}') `)
        }
      }
      sqlReq = sqlReq.concat(' ORDER BY Popularity;')
      console.log('REQ: ', sqlReq)
      try {
        const sqlRep = await pool.query(sqlReq)
        return (sqlRep)
      } catch (error) {
        console.error('ERROR in \'func Req_Male_Homo\' : ', error)
      }
      return (undefined)
  }

}

export default SearchMdl
