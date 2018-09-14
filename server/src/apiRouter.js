// Imports
const Express = require("express");
import { UsersCtrl } from '../controlers/UsersCtrl';


// Routes
exports.router = () => {
	const apiRouter = Express.Router();

	apiRouter.route("/users/register/").post(UsersCtrl.registerNewUser);
	apiRouter.route("/users/login/").post(UsersCtrl.login);
	apiRouter.route("/users/logout/").post(UsersCtrl.logout);
	apiRouter.route("/users/accountActivation/").post(UsersCtrl.accountActivation);
	apiRouter.route("/users/accountActivation/").get(UsersCtrl.accountActivation);

	return apiRouter;
};