import pool from '../config/database'
import serverConf from '../config/server'

export default class Models {
  constructor () {
    this.tableName = 'Users'
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

  async find (column, values) {
    if (column.length !== values.length) {
      console.log(`ERROR:\n\tcolumn ${column}\n\tvalues ${values}`)
      return (false)
    }
    let reqSql = ` SELECT * FROM ${this.tableName} WHERE `
    if (column.length > 1) {
      for (let i = 0; i < column.length - 1; i++) {
        reqSql += `${column[i]} = '${values[i]}' OR `
      }
    }
    reqSql += `${column[column.length - 1]} = '${values[values.length - 1]}'`
    console.log(`FIND TEST ${reqSql}`)
    const response = await pool.query(reqSql)
    return (response)
  }

  async insert (column, values) {
    if (column.length !== values.length) {
      console.log(`ERROR:\n\tcolumn ${column}\n\tvalues ${values}`)
      return (false)
    }

    let reqSql = ` INSERT INTO ${this.tableName} (`
    if (column.length > 1) {
      for (let i = 0; i < column.length - 1; i++) {
        reqSql += `${column[i]}, `
      }
    }
    reqSql += `${column[column.length - 1]}) VALUES (`
    if (values.length > 1) {
      for (let i = 0; i < values.length - 1; i++) {
        reqSql += `'${values[i]}', `
      }
    }
    reqSql += `'${values[values.length - 1]}')`

    console.log(`INSERT TEST: `, reqSql)
    const response = await pool.query(reqSql)
    return (response)
  }

  /**
   * * func update
   * @param colum ['colum_name', ...]
   * @param Values {old: [old_values, ...], new: [new_values, ...]}
  **/
  async update (column, values) {
    console.log('Object: ', values)
    console.log('Object entries: ', Object.entries(values))
    console.log('Object.old: ', values.old)
    console.log('Object.new: ', values.new)
    if (column.length !== values.old.length || column.length !== values.new.length) {
      console.log(`ERROR:\n\tcolumn ${column}\n\tvalues `, values)
      return ({ error: 'update bad_params' })
    }
    let reqSql = `UPDATE ${this.tableName} SET `
    if (column.length > 1) {
      for (let i = 0; i < column.length - 1; i++) {
        reqSql += `${column[i]} = '${values.new[i]}' AND `
      }
    }
    reqSql += `${column[column.length - 1]} = '${values.new[values.new.length - 1]}' WHERE `
    if (column.length > 1) {
      for (let i = 0; i < column.length - 1; i++) {
        reqSql += `${column[i]} = '${values.old[i]}' AND `
      }
    }
    reqSql += `${column[column.length - 1]} = '${values.old[values.old.length - 1]}'`

    console.log(`UPDATE REQUEST=${reqSql}`)

    // const response = await pool.query(reqSql)
    // console.log(`UPDATE RESPONSE: `, response)
    // console.log("---------------------")
    // return (response)
  }

  async delete (column, values) {
    if (column.length !== values.length) {
      console.log(`ERROR:\n\tcolumn ${column}\n\tvalues ${values}`)
      return (false)
    }
    let reqSql = ` DELETE FROM ${this.tableName} WHERE `
    if (column.length > 1) {
      for (let i = 0; i < column.length - 1; i++) {
        reqSql += `${column[i]} = '${values[i]}' AND `
      }
    }
    reqSql += `${column[column.length - 1]} = '${values[values.length - 1]}'`
    console.log(`DELETE TEST ${reqSql}`)
    const response = await pool.query(reqSql)
    return (response)
  }
}
