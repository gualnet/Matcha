
import UsersMdl from '../models/Users';

const usersFuncs = {
	inputsVerifs: (login="", mail="", password="") => {
		let retTab = {
			verifLogin: true,
			verifMail: true,
			verifPassword: true
		};
		const regexMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		// regexPassword for mini 8chars 1alpha 1num
		const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

		if (login === "" || login.length < 2 || login.length > 60) {
			retTab.verifLogin = false;
		}
		if (mail === "" || !regexMail.test(mail) || mail.length > 250) {
			retTab.verifMail = false;
		}
		if (password === "" || !regexPassword.test(password) || password.length > 250) {
			retTab.verifPassword = false;
		}
		return (retTab);
	},
}

exports.UsersCtrl = {
	registerNewUser: (req, res) => {
		console.log("UsersCtrl func register");
		
		//recup / verif des donnees
		const login = req.body.login;
		const mail = req.body.mail;
		const password = req.body.password;
		// console.log("login: ", login, "\nmail: ", mail, "\npassword:", password, "\n");
		
		const retTab = usersFuncs.inputsVerifs(login, mail, password);

		
		for (let elem in retTab) {
			// console.log(`retTab.elem={${retTab[elem]}}`);
			if (!retTab[elem]) {
				userMdl.releaseConn();
				return (res.status(400).type('json').json({ error: {...retTab} }));
			}
		}
		
		// on cree et envoi la requete sur la db
		const userMdl = new UsersMdl();
		
		// test if login or mail already exists
		
		userMdl.find(["Login", "Mail"], [login, mail],
			(results) => {
				console.log("laaaaa", results);
				if (!results[UserId]) {
					console.log("c'est vide");
				}
				else {
					console.log("c'est plein");
				}
		});
		const sqlResult = userMdl.find(["Login", "Mail"], ["titi", "mailbidon"],
		(results) => {
			console.log("laaaaa", results);
			if (!results[UserId]) {
				console.log("c'est vide");
			}
			else {
				console.log("c'est plein");
			}
	});
		// console.log("sqlResult", sqlResult);
		// userMdl.releaseConn();
		// return (res.status(400).type('json').json({ error: "plop" }));

		// on cree le user
		// userMdl.createNewUser({login, mail, password});

		// return (res.status(201).type('json').json({ 'Success': 'new user registered' }));
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
