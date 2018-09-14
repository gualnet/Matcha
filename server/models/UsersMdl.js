
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
import serverConf from '../config/server';
import Models from "./Models";
import { callbackify } from 'util';


const sendNewUserMailConfirmation = (login, mail, hash) => {
	// on slice pour enlever les '
	login = login.slice(1, login.length - 1);
	mail = mail.slice(1, mail.length - 1);

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'at3zlg34yxvbmwov@ethereal.email',
			pass: 'vSnBXEd1MZDvvcp4tQ'
		}
	});
	let htmlMsg = (`<h2>Hey ${login} </h2>\r\n`);
	htmlMsg += ("Your subsciption is about to end.. ");
	htmlMsg += ("<p>To confirme your email adress click <a href='");
	htmlMsg += (`http://localhost:${serverConf.serverPORT}/api/users/accountActivation/?ul=${login}&ua=${hash}`);
	htmlMsg += ("'><span>HERE</span></a></p>\r\n");

	const mailOption = {
		from: "admin@matcha.fr",
		to: "galy@student.42.fr",
		subject: "email confirmation",
		html: htmlMsg
	};
	transporter.sendMail(mailOption, (err, info) => {
		if (err) {
			console.error("Mail error: ", err);
			return ;
		}
		console.log(`Mail sent info: \n`, info);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	});
}

export default class UsersMdl extends Models {
	constructor() {
		// console.log("constructor class UsersMdl");
		super();
	}

	async createNewUser(column, values) {
		// console.log("Values:\n", values);
		// let {login, mail, password} = values;
		const login = values[0];
		const mail = values[1];
		const password = values[2];
		// console.log(`params ${login}, ${mail}, ${password}`);

		let timestamp = new Date().getTime();
		const concat = login.concat(timestamp, mail);
		// console.log("CONCAT'", concat, "'");

		const salt = bcrypt.genSaltSync(10);
		const passHashed = bcrypt.hashSync(concat, salt);
		column.push("UserToken");
		values.push(passHashed);
		const response = await this.insert(column, values);
		sendNewUserMailConfirmation(login, mail, passHashed);
		return (response);
	}

	async accountActive(oldParams) {
		// console.log("start ", oldParams);
		const response = await this.update(["UserToken"], {
			old: [oldParams.ua],
			new: ["0000"]
		});
		// console.log("+accountActive response: ", response);
		// console.log("---------------------");
		return (response);
	}

}

// export default class UsersMdl;