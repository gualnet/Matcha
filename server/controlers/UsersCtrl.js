
// import UsersMdl from "../models/Users";
const UsersMdl = require("../models/Users").UsersMdl;


exports.UsersCtrl = {
	registerNewUser: (req, res) => {
		const userMdl = new UsersMdl();
		console.log("UsersCtrl func register");
		userMdl.insert();
		userMdl.release();
		return (res.type('json').json({
			'test': 'register'
		}));
	},

	login: (req, res) => {
		console.log("UsersCtrl func login");
		return (res.type('json').json({
			'test': 'login'
		}));
	},
	
	logout: (req, res) => {
		console.log("UsersCtrl func logout");
		return (res.type('json').json({
			'test': 'login'
		}));
	}
}
