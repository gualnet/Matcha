
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
import serverConf from '../config/server';
import Models from "./Models";


// local function
const hashGen = (text) => {
	return new Promise ( (resolve, reject) => {
		const saltRound = 8;
		bcrypt.genSalt(saltRound, (err, salt) => {
			bcrypt.hash(text, salt, (err, hash) => {
				resolve(hash);
				reject(err);
			})
		})
	})
};


const sendNewUserMailConfirmation = (login, mail, hash) => {
	const transporter = nodemailer.createTransport(transport[defaults]);
	let htmlMsg = htmlMsg.concat("<h2>Hey ", login, "</h2>\r\n");
	htmlMsg.concat("Your subsciption is about to end.. ");
	htmlMsg.concat("To confirme your email adress click HEHRE");
	htmlMsg.concat("<a href=http://localhost:8888/users/accountActivation/?","ul=",login,"&ua=",hash,">");
	htmlMsg.concat("<span>HERE</span></a> </p>\r\n");
	console.log(`Mail ${htmlMsg}`);
}

export default class UsersMdl extends Models {
	constructor() {
		// console.log("constructor class UsersMdl");
		super();
	}

	createNewUser(column, values) {
		return new Promise( (resolve, reject) => {
			console.log("Values:\n", values);
			let {login, mail, password} = values;
			login = this.dbConn.escape(login);
			mail = this.dbConn.escape(mail);
			password = this.dbConn.escape(password);

			let timestamp = new Date().getTime();
			const concat = login.concat(timestamp, mail);
			hashGen(concat)
			.then((hash) => {
				// console.log("hashgen", hash);
				column.push("UserToken");
				values.push(hash);
				this.insert(column, values)
				.then((result) => {
					resolve(result);
					reject(result);
				})
			})
			.catch((error) => { console.error("ERROR: ", error)});
		})
	}
	
	

	release() {
		console.log("realese class UsersMdl");
		super.release();
	}

}

// export default class UsersMdl;