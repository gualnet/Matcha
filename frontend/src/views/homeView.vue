<template>

<div class="container" id="HomeWrapper">
    <h2>HOME PAGE</h2>
    {{this.$userStore.states.logState}}

    <div class="container FormSignup" v-bind:class="{ invisible: loginState }">

        <form action="NOACTION" class="ui form signup">
            <div class="fields">

                <div class="field">
                    <label>First Name</label>
                    <input type="text" v-model="inpFName">
                </div>

                <div class="field">
                    <label>Last Name</label>
                    <input type="text" v-model="inpLName">
                </div>
            </div>

            <div class="fields">
                <div class="field">
                    <label>Login</label>
                    <input type="text" v-model="inpLogin">
                </div>

                <div class="field">
                    <label>Password</label>
                    <input type="text" v-model="inpPwd">
                </div>

                <div class="field">
                    <label>Mail</label>
                    <input type="text" v-model="inpMail">
                </div>

                <button class="ui button" v-on:click="submitSup">GO</button>

            </div>

        </form>

    </div>

</div>

</template>

<script>
import axios from 'axios'
import userStore from '@/stores/UserStore'

export default {
    data: function () {
        return {
            usrStates: userStore.states,


            //form inputs
            inpFName: null,
            inpLName: null,
            inpLogin: null,
            inpMail: null,
            inpPwd: null,

            //isWarning -> to show error msg
            isLoginUsed: false,
            isMailUser: false,

        }
    },
    computed: {
        loginState: function () {
            return this.usrStates.logState
        }
    },
    methods: {
        submitSup: function () {
            console.log("Call SubmitSup")
            console.log(this.inpFName, this.inpLName, this.inpLogin, this.inpMail, this.inpPwd)
            if(this.inpFName == "" || this.inpFName == "" ||
            this.inpLName == "" || this.inpLName == null ||
            this.inpLogin == "" || this.inpLogin == null ||
            this.inpMail == "" || this.inpMail == null ||
            this.inpPwd == "" || this.inpPwd == null) {
                console.log("BAAAAAAD")
            } else {
                this.getUrl = "http://127.0.0.1:8000/api/signup/" + this.inpFName + "/" +
                this.inpLName + "/" + this.inpLogin + "/" + this.inpMail + "/" + this.inpPwd;

                axios.put(this.getUrl)
                .then(response => {
                    if(response.data != null) {
                        console.log("check error: " + response.data);
                        if(response.data["error"] == "Login already used") {
                            console.log("BINGO001")
                        } else if (response.data["error"] == "Mail already used") {
                            console.log("BINGO002")
                        }
                    }
                })
            }
        }
    },

}

</script>

<style>

.FormSignup.invisible {
    display: none;
}

input.redHighlight {
    border: 1px solid red;
}

</style>

