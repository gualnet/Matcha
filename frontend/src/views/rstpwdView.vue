<template>

<div class="container">
    
    <div>
        <!-- <form class="ui form" v-bind:action="formAction" method="POST"> -->
        <form class="ui form" v-on:submit="submitPwd()" method="POST">
        <div class="field">
            <div class="field">
                <label >New password</label>
                <input type="password" name="pwd1" v-model="pwd1">
            </div>
            <div class="field" v-bind:class=" {error: pwdDif} ">
                <label>Confirm new password</label>
                <input type="password" name="pwd2" v-model="pwd2">
            </div>
                <input style="display: none;" name="token" v-model="token"></input>
            <button class="ui button green" v-on:click.prevent v-on:click="submitPwd()">SEND</button>
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

export default {

    created() {
        let host = store.getters.getGlobalBHOST;
        let path = window.location.href;
        path = path.split('#');
        path = path[1].split('/');
        let t = path[2];

        let requrl = host + "/api/rstpwd/" + t;
        axios.get(requrl)
        .then(response => {
            console.log("MA REPONSE: ", response.data)
            if(response.data == "false") {
                console.log("BIIIINGO")
                document.location.href = store.getters.getGlobalFHOST + "/#/home"
            }
        })
    },

    data: function() {
        return {
        pwd1: "",
        pwd2: "",
        reqUrl: store.getters.getGlobalBHOST + "/api/rstpwd/" + this.token,
        formAction: store.getters.getGlobalBHOST + "/api/rstpwd",
        postData: {pass1: this.pwd1, pass2: this.pwd2},
        }
    },

    methods: {
        ...Vuex.mapGetters([
            'getGlobalBHOST',
            'getGlobalFHOST',
        ]),

        submitPwd() {
            if(this.pwdMatch == true)
                return null
            // console.log("storeget: " + store.getters.getGlobalBHOST)
            // console.log("token: " + this.token)
            
            console.log("REQURL: " + this.reqUrl)
            // let data = {
            //     password1: this.postData.pass1,
            //     password2: this.postData.pass2,
            //     "truc": "++++++",
            // }
            const data = new FormData();

            data.append('truc', 'ADD');
            data.append('action', 'ADD');
            data.append('param', 0);
            data.append('secondParam', 0);
            data.append('file', new Blob(['test payload'], { type: 'text/csv' }));
            console.log("data: " + data);
            axios.post(this.reqUrl, data).then(req => {
                console.log('Req done: ', req)
            }).catch(err => {
                console.error('Error: ', err)
            })
        },

    },

    computed: {
        pwdDif: function() {
            if(this.pwd1 == this.pwd2)
                return false;
            else
                return true;
        },

        token: function() {
            let host = store.getters.getGlobalBHOST;
            let path = window.location.href;
            path = path.split('#');
            path = path[1].split('/');
            return path[2];
        }
    },

    
    
}


</script>

<style>
.form {
    
    margin-left: 15vw;
    width: 70vw;
}
</style>
