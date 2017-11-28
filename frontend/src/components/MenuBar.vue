<template>

    <div id="menuWrapper">
        
        {{ loginState }}
        <div class="ui five item menu" id="menubar">
            <router-link to="/home" class="item">Home</router-link>
            <router-link to="/profil" class="item">Profile</router-link>
            <a class="item">Recherche</a>
            <a class="item">Notification</a>
            <a class="item" id="loginBtn" v-if="!loginState" v-on:click="showLoginForm()">Signin</a>
            <a class="item" v-else v-on:click="setToLogout">Signout</a>
        </div>

        <div id="modal-backgound" class="ui dimmer modals page" v-bind:class="{ active: isModalShow, visible: isModalShow }">
            <div id="modal-content" class="ui standard modal" v-bind:class="{ active: isModalShow, visible: isModalShow }">
                <form class="ui form FormSignin" id="signupForm">
                    <div class="field">
                        <label>Login</label>
                        <input type="text" required v-model="inpLogin">
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <input type="password" required v-model="inpPwd">
                    </div>

                    <div class="ui divider"></div>
                    <router-link to="/" class="item">forgot password</router-link>
                    <div class="ui divider"></div>
                    <div id="btnWrapper">
                    
                    <button class="ui button" v-bind:class="{ green: isGreen}" v-on:mouseover="isGreen= true" v-on:mouseleave="isGreen= false" v-on:click.prevent v-on:click="submitSin()">Login</button>
                    <button class="ui button" v-bind:class="{ red: isRed}" v-on:mouseover="isRed= true" v-on:mouseleave="isRed= false" v-on:click.prevent v-on:click="hideLoginForm()">Cancel</button>
                    
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import userStore from '@/stores/UserStore'


export default {

    // props: function () {
        
    // }
    
    data: function () {
        return {
            state: userStore.states,
            userInfo: null,
            // getUrl: "",

            // //for modal view
            isModalShow: false,
            // //for btn
            isGreen: false,
            isRed: false,

            // //login form data
            inpLogin: null,
            inpPwd: null,
            
        }
    },

    methods: {
        changeLogState () { 
            console.log("COUCOU-> " + this.loginState)
            
        },
        showLoginForm () {
            console.log("ShowLoginForm")
            this.isModalShow = true;
        },
        hideLoginForm () {
            console.log("hideLoginForm: ")
            this.isModalShow = false;
            this.inpLogin = null;
            this.inpPwd = null;
        },
        submitSin() {
            console.log("Call submitCreds()")
            console.log("inpLogin: " + this.inpLogin)
            console.log("inpPwd: " + this.inpPwd)
            if(this.inpLogin != "" && this.inpLogin != null && this.inpPwd != "" && this.inpPwd != null) {
                this.getUrl = "http://127.0.0.1:8000/api/signin/" + this.inpLogin + "/" + this.inpPwd
                axios.get(this.getUrl)
                .then(response => {
                    if(response.data != null) {
                        this.userInfo = response.data[0];
                        this.isModalShow = false;
                    }
                })
                console.log("userInfo: " + this.userInfo)
                console.log("%cLog: End submitCreds()", "color: #F000FF")
            }
            else {
                console.log("%cLog: submitCreds() not sent", "color: #F000FF")
            }
            this.inpLogin = null;
            this.inpPwd = null;
        },
        setToLogin() {
            userStore.setState(true)
        },
        setToLogout() {
            userStore.setState(false)
        }
    },
    
    watch: {
        userInfo: function() {
            console.log("WATCH USERINFO:" + this.userInfo)
            if(this.userInfo != null)
            {
                console.log("%clog : SignIn OK", "color: #F000FF")
                // console.log("-->" + this.userInfo.LastName)
                // userStore.state = true;
                this.setToLogin();                
                // this.isModalShow =/ false;
            }
        },
    },

    computed: {
        loginState: function() {
            console.log("computed loginstate")
            return this.state.logState
        }
    }

}

// #-----#-----#-----#-----#-----#

</script>


<style src="../assets/css/MenuBar.css">



</style>
