import databaseConf from "../config/database";
import mysql from "mysql";
import serverConf from "../config/server";

class Models {
	constructor() {
		if (serverConf.debugMsg) {
			console.log("Constructor class Models");
			console.log("tetative de connexion a la bdd: "+databaseConf.host+":"+
			databaseConf.port+".");
		}
		const dbConn = mysql.createConnection({
			host     : databaseConf.host,
			user     : databaseConf.user,
			password : databaseConf.password,
			database : databaseConf.dbName
		});
		dbConn.connect(
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

	filterNewInputs() {

	}

	find() {
		
	}
}

export default Models;
