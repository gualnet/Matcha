<template>

<div class="container" id="HomeWrapper">
    <h2>HOME PAGE</h2>
    <pre>component homeView: loginState[{{ loginState }}]</pre>
    <div class="container FormSignup" v-bind:class="{ invisible: loginState }">

        <form action="" class="ui form signup">
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
import Vuex from 'vuex'
import { mapGetters, mapActions } from 'vuex'

import store from '../stores'
import cookieManager from '../classes/CookieManager_class'
var cookie = new cookieManager();

export default {

    data: function () {
        return {
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

        ...Vuex.mapGetters([
            'getCookieState',
            'getCookieToken',
        ]),
        
        loginState: function(){
            if(store.getters.getCookieState)
                return true;
            return false;
        },
    },
    methods: {

        ...Vuex.mapActions([
            'setCookieState',
            'setCookieToken',
        ]),

        submitSup: function() {
            // console.log("Call SubmitSup")
            // console.log(this.inpFName, this.inpLName, this.inpLogin, this.inpMail, this.inpPwd)
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
                        // console.log("check error: " + response.data);
                        if(response.data["error"] == "Login already used") {
                            // console.log("BINGO001")
                        } else if (response.data["error"] == "Mail already used") {
                            // console.log("BINGO002")
                        }
                    }
                })
            }
        },
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

