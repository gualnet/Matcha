<template>

    <div>
        mail validation page

    </div>
    
</template>

<script>
import axios from 'axios'

export default {

    created: function() {
        var token = this.$route.params.token;
        console.log("token: " + token)
        this.getUrl = "http://127.0.0.1:8000/api/authconf/" + token
        
        axios.get(this.getUrl).then(
            response => {
                console.log("ma reponse: " + response.data["error"])
                if(response.data["error"] != null) {
                    alert("bad token...")
                    document.location.href = "/home"
                } else {
                    // alert("your account is active")

                    // this.$userStore.setState = true;
                    document.location.href = "/home"
                }
            }
        )
    },  
}

</script>

<style>

div {
    width: 100vw; height: 100vh;
    /* background: black; */
}

</style>
