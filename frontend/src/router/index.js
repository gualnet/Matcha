import Vue from 'vue'
import Router from 'vue-router'

import HomeView from '@/views/homeView'
import ProfilView from '@/views/profilView'
import RstPwdView from '@/views/rstpwdView'

import MenuBar from '@/components/MenuBar'
import MailValidation from '@/components/mailValidation'

Vue.use(Router)

export default new Router({

  mode: 'hash',
  // mode: 'history',

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
      path: "/mailvalidation/:token",
      components: {
        default: MailValidation,
      }
    },
    
    {
      path: "/rstpwd/:token",
      components: {
        default: RstPwdView,
      }
    },
    
    {
      path: "*",
      redirect: "/home"
    }
  ]
})