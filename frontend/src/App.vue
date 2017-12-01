
<template>

  <div id="app">
    
    <router-view name="menubar"/>
    
    <router-view/>

  </div>

</template>


<script>

import Vuex from 'vuex'
import { mapGetters, mapActions } from 'vuex'

import store from './stores'

export default {
  name: 'app',

  computed: {
    ...Vuex.mapGetters([
      'getCookieState',
      'getCookieToken',
    ]),
  },

  methods: {
    ...Vuex.mapActions([
      'setCookieToken',
      'setCookieState',
      'checkCookie',
    ]),
  },

}

//-----#-----#-----//

store.dispatch("checkCookie")
if(store.getters.getCookieState == "") {
  store.dispatch("setCookieState", false)
}

</script>
