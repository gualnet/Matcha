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
	release() {
		console.log("realese class Models");
	}

	find() {
		console.log("Model func find");
		
	}
}

export default Models;
