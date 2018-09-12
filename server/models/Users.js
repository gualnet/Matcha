
import Models from "./Models";

export class UsersMdl extends Models {
	constructor() {
		// console.log("constructor class UsersMdl");
		super();
	}

	find() {
		console.log("UsersMdl func find");
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