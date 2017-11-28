<template>

    <div id="menuWrapper">
        
        {{ loginState }}
        <div class="ui five item menu" id="menubar">
            <router-link to="/" class="item">Home</router-link>
            <router-link to="/profil" class="item">Profile</router-link>
            <a class="item">Recherche</a>
            <a class="item">Notification</a>
            <a class="item" id="loginBtn" v-if="!loginState" v-on:click="showLoginForm()">Signin</a>
            <a class="item" v-else v-on:click="changeLogState">Signout</a>
        </div>

        <div id="modal-backgound" class="ui dimmer modals page" v-bind:class="{ active: isModalShow, visible: isModalShow }">
            <div id="modal-content" class="ui standard modal" v-bind:class="{ active: isModalShow, visible: isModalShow }">
                <form class="ui form FormSignin" id="signupForm">
                    <div class="field">
                        <label>Login</label>
                        <input type="text" required="required" v-model="inpLogin">
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <input type="password" required="required" v-model="inpPwd">

                    </div>
                    <div class="ui divider"></div>
                    <router-link to="/" class="item">forget password</router-link>
                    <div class="ui divider"></div>
                    <div id="btnWrapper">
                    
                    <button class="ui button" v-bind:class="{ green: isGreen, big: isGreen}" v-on:mouseover="isGreen= true" v-on:mouseleave="isGreen= false" v-on:click.prevent v-on:click="submitCreds()">Login</button>
                    <button class="ui button" v-bind:class="{ red: isRed, big: isRed}" v-on:mouseover="isRed= true" v-on:mouseleave="isRed= false" v-on:click.prevent v-on:click="hideLoginForm()">Cancel</button>
                    
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


    data: function () {
        return {
            state: userStore.states,
            userInfo: null,

            isModalShow: false,

            //for btn
            isGreen: false,
            isRed: false,
            //login form data
            inpLogin: null,
            inpPwd: null,

        }
    },

    methods: {
        changeLogState() {
        //     console.log("methods changeLogState")
        //     if(this.states.logState == true)
        //         userStore.setState(false)
        //     else
        //         userStore.setState(true)
        }
    },

    computed:{
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
