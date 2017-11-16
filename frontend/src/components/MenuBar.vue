<template>
  
    <div id="menuWrapper">

        <div class="ui five item menu" id="menubar">
            <router-link to="/" class="item">Home</router-link>
            <router-link to="/profil" class="item">Profile</router-link>
            <a class="item">Recherche</a>
            <a class="item">Notification</a>
            <a class="item" id="loginBtn" v-if="!loginState" v-on:click="showLoginForm()" 
            v-on:mouseover="showFormSignin = true" v-on:mouseleave="showFormSignin = false">Signin</a>
            <a class="item" v-else v-on:click="changeLogState">Signout</a>
        </div>

        <transition name="fade">
        <div id="modal-backgound" class="ui dimmer modals page" v-bind:class="{ active: isModalShow, visible: isModalShow }">
            <div id="modal-content" class="ui standard modal" v-bind:class="{ active: isModalShow, visible: isModalShow }">
                <form class="ui form FormSignin" action="signin" method="POST" id="signupForm">
                    <div class="field">
                        <label>Login</label>
                        <input type="text" name="login">
                    </div>

                    <div class="field">
                        <label>Password</label>
                        <input type="password" name="password">
                    </div>
                    <div class="ui divider"></div>
                    <router-link to="/" class="item">forget password</router-link>
                    <div class="ui divider"></div>
                    <div id="btnWrapper">
                    
                    <button class="ui submit button" v-bind:class="{ green: isGreen, big: isGreen}" v-on:mouseover="isGreen= true" v-on:mouseleave="isGreen= false" type="submit">Login</button>
                    <button class="ui button" v-bind:class="{ red: isRed, big: isRed}" v-on:mouseover="isRed= true" v-on:mouseleave="isRed= false" v-on:click.prevent v-on:click="hideLoginForm()">Cancel</button>
                    
                    </div>
                </form>
            </div>
        </div>
        </transition>

    </div>
</template>

<script>

export default {
    
    data: function () {
        return {
            loginState: false,
            showFormSignin: false,
            isModalShow: false,
            isGreen: false,
            isRed: false,

            //login form data
            // login: null,
            // pwd: null
        }
    },

    methods: {
        changeLogState () {
            if(this.loginState == false)
                this.loginState = true
            else
                this.loginState = false
        },
        showLoginForm () {
            // console.log("ShowLoginForm")
            this.isModalShow = true
        },
        hideLoginForm () {
            // console.log("hideLoginForm: ")
            this.isModalShow = false
        },
    },

    computed: {
        
    }

}

// #-----#-----#-----#-----#-----#

</script>


<style src="../assets/css/MenuBar.css">



</style>
