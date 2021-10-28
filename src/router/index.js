import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/listview',
    name: 'listview',
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/searchview',
    name: 'searchview',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
    beforeEnter: (to, from, next) => {
      setTimeout(() => {
        if (store.state.user.isLogin) {
          console.log(store.state.user.isLogin)
          console.log('I`m in')
          next()
        } else {
          console.log(store.state.user.isLogin)
          console.log('No')
          next('login')
        }
      }, 100)
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
