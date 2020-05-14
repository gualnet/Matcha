// IMPORT
import Models from '../models/Models'
import fs from 'fs'

/* eslint-disable */
export class TagsCtrl {

  insertTags (tag='') {
    const content = fs.readFileSync('./utils/SportList.txt', 'utf8')
    let splited = content.split('\n')
    const tagsMdl = new Models('Tags')

    console.log(splited)
    for (let key in splited) {
      let val = splited[key]
      if (val.length > 2) {
        tagsMdl.insert({
          where: {
            Category: 'sport',
            Name: val
          }
        })
      }
    }

    // if (typeof tag === String) {
    //   console.log('c\'est une string!')
    // } else if (typeof tag === Array) {
    //   console.log('c\'est un array!')
    // }
  }

  /**
   * * func getTagsByUser
   *  @param req
   *  @param res
  **/
  async getAllTags (req, res) {
    // console.log('getTagsByUser body: ', req.body)
    // console.log('getTagsByUser params: ', req.params)
    const tagsMdl = new Models('Tags')
    const sqlRep = await tagsMdl.findAll()

    return (res.status('200').type('json').json({
      success: true,
      msg: 'Here you are !',
      result: { ...sqlRep }
    }))
  }
}
