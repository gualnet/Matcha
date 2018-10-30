
import pool from '../utils/database'
import Models from '../models/Models'

/* eslint-disable */

const SearchMdl = {
  async Req_Male_Hetero () {
    let sqlReq = `SELECT `
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND PIC.IsMain='1' `)
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
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner AND PIC.IsMain='1' `)
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
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC `)
    sqlReq = sqlReq.concat(`WHERE (USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender='0' AND (USR.Orientation='1' OR USR.Orientation='2')) `)
    sqlReq = sqlReq.concat(`OR (USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender='1' AND (USR.Orientation='0' OR USR.Orientation='1')) `)
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
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC `)
    sqlReq = sqlReq.concat(`WHERE (USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender='1' AND (USR.Orientation='1' OR USR.Orientation='2')) `)
    sqlReq = sqlReq.concat(`OR (USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender='0' AND (USR.Orientation='0' OR USR.Orientation='1')) `)
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
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender='0' AND (USR.Orientation='1' OR USR.Orientation='2') `)
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
    sqlReq = sqlReq.concat(`UserId, Popularity, Login, Age, Gender, Orientation, Bio, Interest, BlockedUsers, Reported, Height, Weight, EyeColor, HairColor, PicPath, IsMain `)
    sqlReq = sqlReq.concat(`FROM Users As USR, Pictures AS PIC `)
    sqlReq = sqlReq.concat(`WHERE USR.UserId=PIC.PicOwner And PIC.IsMain='1' AND USR.Gender='1' AND (USR.Orientation='1' OR USR.Orientation='2') `)
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

}

export default SearchMdl
