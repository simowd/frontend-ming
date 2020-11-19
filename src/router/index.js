import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import LatestRelease from '@/views/LatestRelease.vue'
import Sale from '@/views/Sale.vue'
Vue.use(VueRouter)

const routes = [
   {
     path: '/',
     name: 'Home',
     component: HomePage
   },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
<<<<<<< HEAD
=======
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
>>>>>>> 97e9e2ba655cd8fdaaad3243b7686fa7ed53efcb
    path: '/LatestRelease',
    name: 'LatestRelease',
    component: LatestRelease
  },
  {
    path: '/Sale',
    name: 'Sale',
    component: Sale
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
