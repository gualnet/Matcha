
import Models from "./Models";

export default class UsersMdl extends Models {
	constructor() {
		// console.log("constructor class UsersMdl");
		super();
	}

	async createNewUser(values) {
		console.log("Values:\n", values);
		let {login, mail, password} = values;
		login = this.dbConn.escape(login);
		mail = this.dbConn.escape(mail);
		password = this.dbConn.escape(password);

		let reqSql = ` INSERT into ${this.tableName} (Login, Mail, Password, UserToken) `;
		reqSql += `VALUES (${login}, ${mail}, ${password}, "none");`;
		console.log(`SQL request: ${reqSql}`);

		await this.dbConn.query(reqSql,
			(err, res, fields) => {
				if (err) throw err;
				// console.log(`ERROR: `, err, "\n");
				// console.log(`RESULT: `, res, "\n");
				// console.log(`fields: `, fields);
			})


	}
	
	insert() {
		console.log("UsersMdl func insert");
	}
	
	delete() {
		console.log("UsersMdl func delete");
	}

	release() {
		console.log("realese class UsersMdl");
		super.release();
	}

}

// export default class UsersMdl;