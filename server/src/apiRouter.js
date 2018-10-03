// Imports
import { verifCreds } from '../middleware/verifCreds'
import { UsersCtrl } from '../controlers/UsersCtrl'
import { PicturesCtrl } from '../controlers/PicturesCtrl'
const Express = require('express')

// Routes
exports.router = () => {
  const apiRouter = Express.Router()

  apiRouter.route('/user/register').post(UsersCtrl.registerNewUser)
  apiRouter.route('/user/login').post(UsersCtrl.login)
  apiRouter.route('/user/logout').post(UsersCtrl.logout)
  apiRouter.route('/user/activation').get(UsersCtrl.accountActivation)
  apiRouter.route('/user/resetpass').post(UsersCtrl.resetAccountPassword)

  apiRouter.route('/user/profil/:uid/:token')
    .get(UsersCtrl.profilGetUser)

  const picCtrl = new PicturesCtrl()
  apiRouter.route('/picture')
    .post(verifCreds, picCtrl.addNewPicture)
    .put(verifCreds, picCtrl.setMainPicture)
    .delete(verifCreds, picCtrl.removePicture)
  apiRouter.route('/picture/userpics')
    .post(verifCreds, picCtrl.getAllPicture)

  return apiRouter
}
