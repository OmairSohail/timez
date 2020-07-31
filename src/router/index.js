import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../views/Login.vue';
import signup from '../views/Signup.vue';
import dashboard from '../views/Dashboard.vue';
import profile from '../views/Profile.vue';
import myattendence from '../views/MyAttedence.vue';
import attendence from '../views/Attendence.vue';

Vue.use(VueRouter)

  const routes = [
  
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
  },
  {
    path: '/UserAttendence',
    name: 'myattendence',
    component: myattendence,
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/attendence',
    name: 'attendence',
    component: attendence
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
