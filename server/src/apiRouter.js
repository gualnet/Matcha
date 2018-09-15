// Imports
import { UsersCtrl } from '../controlers/UsersCtrl'
const Express = require('express')

// Routes
exports.router = () => {
  const apiRouter = Express.Router()

  apiRouter.route('/users/register/').post(UsersCtrl.registerNewUser)
  apiRouter.route('/users/accountActivation/').get(UsersCtrl.accountActivation)
  apiRouter.route('/users/login/').post(UsersCtrl.login)
  apiRouter.route('/users/logout/').post(UsersCtrl.logout)

  return apiRouter
}
