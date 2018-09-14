import pool from '../config/database';
import serverConf from '../config/server';

export default class Models {
	constructor() {
		this.tableName = "Users";
		// * Reminder users table Columns
		// "UserId", "UserToken", "Login",
		// "Password", "FirstName", "LastName",
		// "Age", "Mail", "Gender", "Orientation"
		// *
		if (serverConf.debugMsg) {
			// console.log("Constructor class Models");
			// console.log("tetative de connexion a la bdd: "+databaseConf.host+":"+
			// databaseConf.port+".");
		}
	}
	// No destructor.. all the ressources that need to be realease at the end.

	async find(column, values) {
		if (column.length !== values.length) {
			console.log(`ERROR:\n\tcolumn ${column}\n\tvalues ${values}`);
			return (false);
		}
		let reqSql = ` SELECT * FROM ${this.tableName} WHERE `;
		if (column.length > 1) {
			for (let i = 0; i < column.length - 1; i++) {
				reqSql += `${column[i]} = '${values[i]}' OR `;
			}
		}
		reqSql += `${column[column.length - 1]} = '${values[values.length - 1]}';`;
		console.log(`FIND TEST ${reqSql}`);
		const response = await pool.query(reqSql);
		return (response);
	}

	async insert(column, values) {
		if (column.length !== values.length) {
			console.log(`ERROR:\n\tcolumn ${column}\n\tvalues ${values}`);
			return (false);
		}

		let reqSql = ` INSERT INTO ${this.tableName} (`;
		if (column.length > 1) {
			for (let i = 0; i < column.length - 1; i++) {
				reqSql += `${column[i]}, `;
			}
		}
		reqSql += `${column[column.length - 1]}) VALUES (`;
		if (values.length > 1) {
			for (let i = 0; i < values.length - 1; i++) {
				reqSql += `'${values[i]}', `;
			}
		}
		reqSql += `'${values[values.length - 1]}');`;

		console.log(`INSERT TEST: `, reqSql);
		const response = await pool.query(reqSql);
		return (response);
	}

	/**
	 * * update
	 * @param colum ['colum_name', ...]
	 * @param Values {old: [old_values, ...], new: [new_values, ...]}
	 */
	async update(column, Values) {
		console.log("Object: ", Values);
		console.log("Object.old: ", Values.old);
		console.log("Object.new: ", Values.new);
		if (column.length !== Values.old.length || column.length !== Values.new.length) {
			console.log(`ERROR:\n\tcolumn ${column}\n\tvalues `, values);
			return ({error: "update bad_params"});
		}
		let reqSql = `UPDATE ${this.tableName} SET `;
		if (column.length > 1) {
			for (let i = 0; i < column.length - 1; i++) {
				reqSql += `${column[i]} = '${Values.new[i]}' AND `;
			}
		}
		reqSql += `${column[column.length - 1]} = '${Values.new[Values.new.length - 1]}' WHERE `;
		if (column.length > 1) {
			for (let i = 0; i < column.length - 1; i++) {
				reqSql += `${column[i]} = '${Values.old[i]}' AND `;
			}
		}
		reqSql += `${column[column.length - 1]} = '${Values.old[Values.old.length - 1]}';`;

		console.log(`UPDATE REQUEST=${reqSql}`);
		
		const response = await pool.query(reqSql);
		// console.log(`UPDATE RESPONSE: `, response);
		// console.log("---------------------");
		return (response);
	};

	async delete(column, values) {
		if (column.length !== values.length) {
			console.log(`ERROR:\n\tcolumn ${column}\n\tvalues ${values}`);
			return (false);
		}
		let reqSql = ` DELETE FROM ${this.tableName} WHERE `;
		if (column.length > 1) {
			for (let i = 0; i < column.length - 1; i++) {
				reqSql += `${column[i]} = '${values[i]}' AND `;
			}
		}
		reqSql += `${column[column.length - 1]} = '${values[values.length - 1]}';`;
		console.log(`DELETE TEST ${reqSql}`);
		const response = await pool.query(reqSql);
		return (results);
	}
}

