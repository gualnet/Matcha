// IMPORT
import Models from '../models/Models'

/* eslint-disable */
const LikesCtrl = {
  async createNewLike (req, res) {
    const likesMdl = new Models('Likes')
    console.log("LikesCtrl: ")
    // console.log("LikesCtrl: ", req.body)
    try {
      let sqlRes = await likesMdl.find({
        where: {
          idOwner: req.body.AUTH_USER.UserId,
          idTarget: req.body.target
        }
      })
      // console.log('sqlRes', sqlRes.length)
      if (sqlRes.length > 0) {
        return (res.status('200').type('json').json({
          success: true,
          msg: 'Already exists, just chiiiiilll',
          result: null
        }))
      }  else {
        sqlRes = await likesMdl.insert({
          where: {
            idOwner: req.body.AUTH_USER.UserId,
            idTarget: req.body.target
            // idTarget: 555
          }
        })
        // console.log('sqlRes', sqlRes)
        return (res.status('200').type('json').json({
          success: true,
          msg: 'Like saved',
          result: null
        }))
      }
    } catch (error) {
      return (res.status('400').type('json').json({
        success: false,
        msg: 'Error during the process please retry later',
        result: null
      }))
    }
  },

  async deleteLike (req, res) {
    const likesMdl = new Models('Likes')
    console.log("delete like: ")
    let sqlRes = likesMdl.delete({
      where: {
        idOwner: req.body.AUTH_USER.UserId,
        idTarget: req.body.target
      }
    })
    return (res.status('200').type('json').json({
      success: true,
      msg: 'Like deleted',
      result: null
    }))
  },

  async getUserLikes (UserId) {
    const likesMdl = new Models('Likes')

    const sqlRes = await likesMdl.find({
      where: {
        idOwner: UserId
      }
    })
    // console.log('sqlRes', sqlRes)
    let likesArr = []
    for (let elem in sqlRes) {
      likesArr.push(sqlRes[elem].idTarget)
    }
    return (likesArr)
  }

}

export { LikesCtrl }
