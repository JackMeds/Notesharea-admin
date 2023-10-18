import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:"/",
    name:"Login",
    component: function () {
      return import( '../views/Login.vue')
    },
  },
  {
    path:"/register",
    name:"Register",
    component: function () {
      return import( '../views/register.vue')
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: function () {
      return import( '../views/Home.vue')
    },
    children:[
      {
        path:"/home",
        name:"Default",
        component: function () {
          return import( '../views/Default.vue')
        },
      },
      {
        path:"/dashboard",
        name:"Dashboard",
        component: function () {
          return import( '../views/Dashboard.vue')
        },
      },
      {
        path:"/user",
        name:"User",
        component: function () {
          return import( '../views/User.vue')
        },
      },
      {
        path:"/notes",
        name:"Notes",
        component: function () {
          return import( '../views/Notes.vue')
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
