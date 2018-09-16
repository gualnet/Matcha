
import pool from '../utils/database'
import serverConf from '../utils/server'

export default class Models {
  constructor (tableName) {
    this.tableName = tableName
    // * Reminder users table Columns
    // "UserId", "UserToken", "Login",
    // "Password", "FirstName", "LastName",
    // "Age", "Mail", "Gender", "Orientation"
    // *
    if (serverConf.debugMsg) {
      console.log('Constructor class Models')
    }
  }
  // No destructor.. all the ressources that need to be realease at the end.

  /**
   * * func find
   * @param values: {where: {column: value, ...}}
  **/
  async find (values, andOr = 'AND') {
    if (Object.values(values.where).length === 0) {
      console.error('ERROR in models > find(): ', values)
      return new Error('ERROR empty values', 'Models.js > find')
    }
    let reqSql = ` SELECT * FROM ${this.tableName} WHERE `
    const objectLen = Object.values(values.where).length
    let i = 0
    if (objectLen > 1) {
      for (i = 0; i < objectLen - 1; i++) {
        const whereVal = pool.escape(Object.entries(values.where)[i][1])
        reqSql += `${Object.entries(values.where)[i][0]} = ${whereVal} ${andOr} `
      }
    }
    const whereVal = pool.escape(Object.entries(values.where)[i][1])
    reqSql += `${Object.entries(values.where)[i][0]} = ${whereVal};`
    console.log(`FIND TEST ${reqSql}`)

    try {
      const response = await pool.query(reqSql)
      return (response)
    } catch (error) {
      throw error
    }
  }

  /**
   * * func insert
   * @param values: {values: {column: value, ...}}
  **/
  async insert (values) {
    console.log('INSERT Object: ', values)

    if (Object.values(values.where).length === 0) {
      console.error('ERROR in models > insert(): ', values)
      return new Error('ERROR empty values', 'Models.js > insert')
    }

    let reqSql = ` INSERT INTO ${this.tableName} (`
    const objectLen = Object.values(values.where).length
    let i = 0
    if (objectLen > 1) {
      for (i = 0; i < objectLen - 1; i++) {
        reqSql += `${Object.entries(values.where)[i][0]}, `
      }
    }
    reqSql += `${Object.entries(values.where)[i][0]}) VALUES (`

    if (objectLen > 1) {
      for (i = 0; i < objectLen - 1; i++) {
        const escapedValue = pool.escape(Object.entries(values.where)[i][1])
        reqSql += `${escapedValue}, `
      }
    }
    const escapedValue = pool.escape(Object.entries(values.where)[i][1])
    reqSql += `${escapedValue});`
    console.log(`INSERT TEST: `, reqSql)

    try {
      const response = await pool.query(reqSql)
      return (response)
    } catch (error) {
      throw error
    }
  }

  /**
   * * func update
   * @param values: {set: {column: value, ...}, where: {column: value, ...}}
  **/
  async update (values) {
    // console.log('Object: ', values)
    if (Object.values(values.where).length === 0) {
      console.error('ERROR in models > delete(): ', values)
    }

    let reqSql = `UPDATE ${this.tableName} SET `
    let objectLen = Object.values(values.set).length
    let i = 0
    if (objectLen > 1) {
      for (i = 0; i < objectLen - 1; i++) {
        const setVal = pool.escape(Object.entries(values.set)[i][1])
        reqSql += `${Object.entries(values.set)[i][0]} = ${setVal}, `
      }
    }
    const setVal = pool.escape(Object.entries(values.set)[i][1])
    reqSql += `${Object.entries(values.set)[i][0]} = ${setVal} WHERE `

    objectLen = Object.values(values.where).length
    i = 0
    if (objectLen > 1) {
      for (i = 0; i < objectLen - 1; i++) {
        const whereVal = pool.escape(Object.entries(values.where)[i][1])
        reqSql += `${Object.entries(values.where)[i][0]} = ${whereVal} AND `
      }
    }
    const whereVal = pool.escape(Object.entries(values.where)[i][1])
    reqSql += `${Object.entries(values.where)[i][0]} = ${whereVal};`

    console.log(`UPDATE REQUEST=${reqSql}`)

    try {
      const response = await pool.query(reqSql)
      return (response)
    } catch (error) {
      throw error
    }
  }

  /**
   * * func delete
   * @param values: {where: {column: value, ...}}
  **/
  async delete (values) {
    // console.log('Object: ', values)

    if (Object.values(values.where).length === 0) {
      // console.error('ERROR in models > delete(): ', values)
      return new Error('ERROR empty values', 'Models.js > delete')
    }

    let reqSql = ` DELETE FROM ${this.tableName} WHERE `
    const objectLen = Object.values(values.where).length
    let i = 0
    if (objectLen > 1) {
      for (i = 0; i < objectLen - 1; i++) {
        const whereVal = pool.escape(Object.entries(values.where)[i][1])
        reqSql += `${Object.entries(values.where)[i][0]} = ${whereVal} AND `
      }
    }
    const whereVal = pool.escape(Object.entries(values.where)[i][1])
    reqSql += `${Object.entries(values.where)[i][0]} = ${whereVal};`
    console.log(`DELETE TEST ${reqSql}`)

    try {
      const response = await pool.query(reqSql)
      return (response)
    } catch (error) {
      throw error
    }
  }
}
