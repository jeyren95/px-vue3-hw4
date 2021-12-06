import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Movie from "../views/Movie.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/movies/:id",
    name: "Movie",
    component: Movie
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
