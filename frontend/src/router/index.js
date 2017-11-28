import Vue from 'vue'
import Router from 'vue-router'

import HomeView from '@/views/homeView'
import ProfilView from '@/views/profilView'

import MenuBar from '@/components/MenuBar'
import StoredMenuBar from '@/components/StoredMenuBar'
import FormSignup from '@/components/FormSignup'





Vue.use(Router)

export default new Router({

  // mode: 'hash',

  routes: [
    // {
    //   path: "/",
    //   // name: "HOME",
    //   components: {
    //     menubar: MenuBar,
    //     formsignup: FormSignup,
    //     // storedmenubar: StoredMenuBar,
    //     // loginState: login_state,
    //   }
    // },
    {
      path: "/home",
      // name: "HOME",
      components: {
        default: HomeView,
        menubar: MenuBar,
      }
    },

    {
      path: "/profil",
      // name: "PROFILE",
      components: {
        default: ProfilView,
        menubar: MenuBar,
      }
    },
    
    {
      path: "*",
      redirect: "/home"
    }
  ]
})