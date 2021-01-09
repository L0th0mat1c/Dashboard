import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue')
  },
  {
    path: '/userpage',
    name: 'userpage',
    component: () => import(/* webpackChunkName: "about" */ '../components/userPage.vue')
  },
  {
    path: '/weatherpage',
    name: 'weatherpage',
    component: () => import(/* webpackChunkName: "about" */ '../components/weatherPage.vue')
  },
  {
    path: '/about.json',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../components/about.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
