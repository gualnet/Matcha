// Imports
import { verifCreds } from '../middleware/verifCreds'
import { UsersCtrl } from '../controlers/UsersCtrl'
import { PicturesCtrl } from '../controlers/PicturesCtrl'
import { TagsCtrl } from '../controlers/TagsCtrl'
import { GeolocationCtrl } from '../controlers/GeolocationCtrl'
import { SearchCtrl } from '../controlers/SearchCtrl'
import { LikesCtrl } from '../controlers/LikesCtrl'

import seederRU from '../utils/seeder_randomUser'

const Express = require('express')

// Routes
exports.router = () => {
  const apiRouter = Express.Router()

  apiRouter.route('/admin/createRandomUser').get(seederRU.createRandomUser)

  apiRouter.route('/user/register').post(UsersCtrl.registerNewUser)
  apiRouter.route('/user/login').post(UsersCtrl.login)
  apiRouter.route('/user/logout').post(UsersCtrl.logout)
  apiRouter.route('/user/activation').get(UsersCtrl.accountActivation)
  apiRouter.route('/user/resetpass').post(UsersCtrl.resetAccountPassword)
  apiRouter.route('/user/checklogin').post(UsersCtrl.checkLogin)

  apiRouter.route('/user/profil/:uid/:token')
    .get(UsersCtrl.profilGetUser)
  apiRouter.route('/user/profil')
    .put(verifCreds, UsersCtrl.profilUpdateUser)

  const picCtrl = new PicturesCtrl()
  apiRouter.route('/picture')
    .post(verifCreds, picCtrl.addNewPicture)
    .put(verifCreds, picCtrl.setMainPicture)
    .delete(verifCreds, picCtrl.removePicture)
  apiRouter.route('/picture/:targetUID')
    .post(verifCreds, picCtrl.getAllPicture)

  const tagsCtrl = new TagsCtrl()
  apiRouter.route('/tags/:uid/:token')
    .get(verifCreds, tagsCtrl.getAllTags)
  apiRouter.route('/tags')
    .post(verifCreds, tagsCtrl.insertTags)

  apiRouter.route('/geoloc/get')
    .post(verifCreds, GeolocationCtrl.getGeolocation)
  apiRouter.route('/geoloc/set')
    .post(verifCreds, GeolocationCtrl.setGeolocation)
  apiRouter.route('/geoloc/rev')
    .post(verifCreds, GeolocationCtrl.reverseGeoloc)
  apiRouter.route('/geoloc/man')
    .post(verifCreds, GeolocationCtrl.manualGeoloc)

  apiRouter.route('/search/getAll')
    .post(verifCreds, SearchCtrl.getAllMembers)
  apiRouter.route('/search/getFiltered')
    .post(verifCreds, SearchCtrl.getFiltered)

  apiRouter.route('/interact/like')
    .post(verifCreds, LikesCtrl.createNewLike)

  return apiRouter
}
