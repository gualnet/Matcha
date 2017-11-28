<template>
    <div class="loginstate ui field">

    {{ curState }}

    <div class="loginState ui button" @click="login">yes</div>
    <div class="loginState ui button" @click="logout">no</div>

    </div>
</template>




<script>
    import userStore from '@/stores/UserStore'

export default {

    data: function () {
        return {
            usrStrState: userStore.states
        }
    },

    computed: {
        curState: function () {
            return this.usrStrState.logState
        }
    },

    methods: {
            login: function () {
                userStore.setState(true)
            },
            logout: function () {
                userStore.setState(false)
            }
    },


}
</script>

<style>
.loginstate{
    border: 1px solid #3413D7;
}
</style>
