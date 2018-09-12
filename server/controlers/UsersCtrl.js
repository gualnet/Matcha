
const UsersMdl = require("../models/Users").UsersMdl;

const usersFuncs = {
	inputsVerifs: (login="", mail="", password="") => {
		let retTab = {
			verifLogin: true,
			verifMail: true,
			verifPassword: true
		};

		if (login === "" || login.length < 2 || login.length > 30) {
			retTab.verifLogin = false;
		}
		if (mail === "" || mail.length < 5 || mail.length > 250) {
			retTab.verifMail = false;
		}
		if (password === "" || password.length > 250) {
			retTab.verifPassword = false;
		}
		else {
			// regex for mini 8chars 1alpha 1num
			const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

			console.log("PASSW TEST ", regexPassword.test(password));
			if (!regexPassword.test(password)) {
				retTab.verifPassword = false;
			}
		}
		return (retTab);
	}
}


exports.UsersCtrl = {
	registerNewUser: (req, res) => {
		const userMdl = new UsersMdl();
		console.log("UsersCtrl func register");
		
		//recup des donnees
		const login = req.body.login;
		const mail = req.body.mail;
		const password = req.body.password;
		console.log("login: ", login, "\nmail: ", mail, "\npassword:", password, "\n");

		const retTab = usersFuncs.inputsVerifs(login, mail, password);
		for (let elem in retTab) {
			if (!retTab.elem) {
				return (res.type('json').json({ ...retTab }));
			}
			console.log("ELEM: ", retTab[elem]);
		}





		return (res.type('json').json({
			'test': 'register ok'
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
