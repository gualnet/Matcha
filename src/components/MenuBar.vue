<template>
  
    <div id="menuWrapper">
        <div class="ui five item menu" id="menubar">
            <router-link to="/" class="item">Home</router-link>
            <router-link to="/profil" class="item">Profile</router-link>
            <a class="item">Recherche</a>
            <a class="item">Notification</a>
            <a class="item" id="loginBtn" v-if="!loginState" v-on:click="changeLogState" 
            v-on:mouseover="showFormSignin = true" v-on:mouseleave="showFormSignin = false">Signin</a>
            <a class="item" v-else v-on:click="changeLogState">Signout</a>
        </div>

        <!-- <div class="container FormSignup" v-on:mouseover="showFormSignin = true" v-on:mouseleave="showFormSignin = false" > -->
        
        <form action="NOACTION" class="ui form FormSignin" v-on:mouseover="showFormSignin = true" 
        v-on:mouseleave="showFormSignin = false" v-if="showFormSignin">
            <div class="field">
                <label>Login</label>
                <input type="text">
            </div>

            <div class="field">
                <label>Password</label>
                <input type="text">
            </div>  
            <i class=" check circle outline icon" 
            v-on:mouseover="ValidationIcon ='big'" v-on:mouseleave="ValidationIcon ='big disabled'" :class="ValidationIconStatus"></i>
        </form>
        
        <p>Ici ma page home quant je ne suis pas loger</p>
    </div>
</template>

<script>

export default {
    
    data: function () {
        return {
            loginState: false,
            showFormSignin: false,
            ValidationIcon: "big disabled",
        }
    },

    methods: {
        changeLogState () {
            if(this.loginState == false)
                this.loginState = true
            else
                this.loginState = false
        },
    },

    computed: {
        ValidationIconStatus () {
            return this.ValidationIcon
        }
    }

}

</script>


<style src="../assets/css/MenuBar.css">

</style>
