import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Login from '@/views/Login.vue'
import LatestRelease from '@/views/LatestRelease.vue'
import SignUp from '@/views/SignUp.vue'
import Sale from '@/views/Sale.vue'
import AddPublisher from '@/views/AddPublisher.vue'

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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/latestrelease',
    name: 'LatestRelease',
    component: LatestRelease
  },
  {
    path: '/sale',
    name: 'Sale',
    component: Sale
  },
  {
    path: '/register',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/admin/add-publisher',
    name: 'AddPublisher',
    component: AddPublisher
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
