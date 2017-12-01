import Vue from 'vue'
import Vuex from 'vuex'

import cookieManager from '../classes/CookieManager_class'
var cookie = new cookieManager();

Vue.use(Vuex)

export default new Vuex.Store ({

    state: {
        user: {
            // logged: false,
        },

        cookie: {
            usrState: false,
            usrToken: false,
        }
    },

    mutations: {
        SET_COOKIE_STATE: (state, value) => {
            state.cookie.usrState = value;
        },

        SET_COOKIE_TOKEN: (state, value) => {
            state.cookie.usrToken = value;
        },

        // SET_USER_LOGGED: (state, newState) => {
        //         state.user.logged = newState;
        // },

        // SET_USER_TOKEN: (state, value) => {
        //     state.user.token = value;
        // },
    },

    getters: {
        getCookieState: state => state.cookie.usrState,
        getCookieToken: state => state.cookie.usrToken,

        // getUser: state => state.user,
        // getUserLogged: state => state.user.logged,

    },

    actions: {
        setCookieState: (store, value) => {
            console.log("CALL STORE ACTION setCookieState")
            cookie.setCookie("usrState", value, 2)
            store.commit("SET_COOKIE_STATE", value)
            if(value == false) {
                cookie.setCookie("usrToken", "", 0)
                store.commit("SET_COOKIE_TOKEN", "")
            }
        },

        setCookieToken: (store, value) => {
            console.log("CALL STORE ACTION setCookieToken")
            cookie.setCookie("usrToken", value, 2)
            store.commit("SET_COOKIE_TOKEN", value)
        },

        checkCookie: (store) => {
            console.log("CALL STORE ACTION checkCookie")
            let resState = cookie.getCookie("usrState")
            let resToken = cookie.getCookie("usrToken")
            console.log("checkCookie test res : " + resState + " | " + resToken)
            if(resState == "true" && resToken != "") {
                console.log("checkCookie reset cas 1")
                store.commit("SET_COOKIE_STATE", resState)
                store.commit("SET_COOKIE_TOKEN", resToken)
            } else if (resState != "" && resToken == "") {
                console.log("checkCookie reset cas 2")
                cookie.setCookie("usrState", "false", 2)
                store.commit("SET_COOKIE_STATE", false)
            } else if ((resState == "" || resState == "false") && resToken != "") {
                console.log("checkCookie reset cas 3")
                cookie.setCookie("usrState", "false", 2)
                cookie.setCookie("usrToken", "false", 0)
                store.commit("SET_COOKIE_STATE", "")
                store.commit("SET_COOKIE_TOKEN", "")
            }
        }

        // setUserLogged: (store, newState) => {
        //     console.log("CALL STORE ACTION setUserLogged")
        //     store.commit('SET_USER_LOGGED', newState)
        // },
        // setUserToken: (store, value) => {
        //     console.log("CALL STORE ACTION setUserToken")
        //     store.commit('SET_USER_TOKEN', value)
        // },
    },

    strict: true,
})