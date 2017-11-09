import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MenuBar from '@/components/MenuBar'
import ProfilPanel from '@/components/ProfilPanel'
import FormSignup from '@/components/FormSignup'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // },
    {
      path: "/",
      // name: "HOME",
      components: {
        menubar: MenuBar,
        formsignup: FormSignup,

      }
    },

    {
      path: "/profil",
      // name: "PROFILE",
      components: {
        default: ProfilPanel,
        menubar: MenuBar,
      }
    },
    
    {
      path: "*",
      redirect: "/"
    }
  ]
})
