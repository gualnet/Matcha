
import UsersMdl from '../models/UsersMdl';

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
		
		
		const userMdl = new UsersMdl();
		
		// test if login or mail already exists
		userMdl.find(["Login", "Mail"], [login, mail])
		.then( (results) => {
			// console.log("async results: ", results);
			if (results.length !== 0) {
				let error = {};
				if (results[0].Login === login) {
					error[login] = "used";
				}
				if (results[0].Mail === mail) {
					error[mail] = "used";
				}
				return (res.status(400).type('json').json({ error }));
			} else {
				// Creation du nouvel utilisateur
				userMdl.createNewUser(["Login", "Mail", "Password"], [login, mail, password])
				.then ((result) => {
					// console.log("createNewUser result: ", result);
					// ! pour tests je delete le user qui vient d'etre ajoute
					// userMdl.delete(["mail"], [mail])
					// .then((result) => {
					// 	// console.log(`DELETE RESULT `, result);
					// })
					// ! end
				})
				.catch( (error) => {
					console.error("UsersCtrl_err00", error);
				});

				userMdl.releaseConn();
				return (res.status(201).type('json').json({ 'Success': 'new user registered' }));
			}
		})
		.catch( (error) => {
			console.error("UsersCtrl_err01", error);
		})
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
	},

	accountActivation: async (req, res) => {
		// console.log("account activation.. ");
		const userMdl = new UsersMdl();
		console.log("0");
		const response = await userMdl.accountActive(req.query, (error, response, fields) => {
			if (error) throw error;
			console.log("laaaaaaaaaa: ", response);
			if (response.affectedRows !== 1) {
				res.type('json').json({
					'error': `Number of affected row incorrect = [${response.affectedRows}]`
				})
			} else if (response.affectedRows === 1) {
				res.type('json').json({
					'paramReceived': {
						'ul': req.query.ul,
						'ua': req.query.ua
					},
					'docInfo': {
						'currentPage': 'accountActivation',
						'redirectTo': 'Home',
					},
					'success': {

					},
					'userState': {
						'login': 'true',
						'usrId': '',
						'userToken': ''
					}
				});
			} else {
				res.type('json').json({
					'error': 'unknown error'
				})
			}
		});


	}
}
