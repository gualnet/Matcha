import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({

    state: {
        user: {
            logged: false,
            id: "none",
            token: "none",
        },
    },

    mutations: {
        SET_LOG_STATE: (state, newState) => {
                state.user.logged = newState
        }
    },

    getters: {
        getUser: state => state.user,
        getUserLogState: state => state.user.logged,

    },

    actions: {
        setLogState: (store, newState) => {
            console.log("CALL STORE ACTION setLogState")
            store.commit('SET_LOG_STATE', newState)
        }

    },

    strict: true,


})