import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
import Login from '@/pages/Login'
import SetPsd from '@/pages/SetPsd'
import Information from '@/pages/Information'
import Home from '@/pages/Home'
import {getCookie} from '@/util/utils'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/SetPsd',
      name: 'SetPsd',
      component: SetPsd
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information,
      meta: {requireAuth: false}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: false}
    },
    {path: '*', redirect: '/Login'}
  ]
})

// 登录控制
router.beforeEach((to, from, next) => {
  store.dispatch('changePath', to.name)
  if (to.meta.requireAuth) {
    if (getCookie('btwccy_cookie')) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
  store.dispatch('changePath', to.name)
})
export default router
