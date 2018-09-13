
import databaseConf from "../config/database";
// import mysql from "mysql";
import mysql from "mysql2";
import serverConf from "../config/server";

export default class Models {
	constructor() {
		this.tableName = "Users";
		// * Reminder users table Columns
		// "UserId", "UserToken", "Login",
		// "Password", "FirstName", "LastName",
		// "Age", "Mail", "Gender", "Orientation"
		if (serverConf.debugMsg) {
			// console.log("Constructor class Models");
			// console.log("tetative de connexion a la bdd: "+databaseConf.host+":"+
			// databaseConf.port+".");
		}
		this.dbConn = mysql.createConnection({
			host		: databaseConf.host,
			port		: databaseConf.port,
			user		: databaseConf.user,
			password	: databaseConf.password,
			database	: databaseConf.dbName
		});
		this.dbConn.connect(
			// callback sur erreur de connexion
			(err) => {
				if (err && serverConf.debugMsg) {
					console.log("Error: connection to " + databaseConf.dbName +
					": " + err.stack);
				}
				else if (serverConf.debugMsg){
					console.log("Success: connected to " + databaseConf.dbName);
				}
			}
		)
	}
	// No destructor.. all the ressources that need to be realease at the end.
	releaseConn() {
		// console.log("realese class Models");
		this.dbConn.end;
	}

	async find(column, values, callbackFunc) {
		// console.log("column.length: ", column.length)
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
		await this.dbConn.execute(reqSql,
			(error, results, fields) => {
				if (error) throw error;
				callbackFunc(results);
				if (results.length === 0) {
					console.log("COUCOU01");
					return (false);
				} else {
					console.log("COUCOU02");
					return (true);
				}
			})
	}
}

