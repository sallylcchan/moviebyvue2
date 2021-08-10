import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/welcome.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import Dashboard from '../views/dashboard.vue'
import Moviedetail from '../views/moviedetail.vue'
import MovieForPost from '../views/movieforpost.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
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
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/moviedetail',
    name: 'Moviedetail',
    component: Moviedetail
  },
  {
    path: '/movieforpost',
    name: 'MovieForPost',
    component: MovieForPost
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
