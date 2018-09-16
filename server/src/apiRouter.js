// Imports
import { UsersCtrl } from '../controlers/UsersCtrl'
const Express = require('express')

// Routes
exports.router = () => {
  const apiRouter = Express.Router()

  apiRouter.route('/user/register/').post(UsersCtrl.registerNewUser)
  apiRouter.route('/user/login/').post(UsersCtrl.login)
  apiRouter.route('/user/logout/').post(UsersCtrl.logout)
  apiRouter.route('/user/activation').get(UsersCtrl.accountActivation)
  apiRouter.route('/user/resetpass').post(UsersCtrl.resetAccountPassword)

  apiRouter.route('/profil/:id').put(UsersCtrl.profilUpdateUser)
  apiRouter.route('/profil/:id').get(UsersCtrl.profilGetUser)

  return apiRouter
}
