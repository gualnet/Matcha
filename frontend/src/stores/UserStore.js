class UserStore {
    
    constructor(){
        this.states = {
            logState: false,
        }
    }

    setState(newValue) {
        console.log("Setting new user state value to" + newValue, "##00FF50")
        this.states.logState = newValue

    }
}

export default new UserStore()