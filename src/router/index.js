import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import login from '../views/login.vue'
import StudentDetail from '../views/Students/StudentDetail.vue'
import Attendence from '../views/Students/Attendence.vue'
import Exams from '../views/Students/Exams.vue'
import fees from '../views/Students/fees.vue'
import submit from '../views/submit.vue'
import forgotpassword from '../views/forgotpassword.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props:true
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/student-detail/:id',
    name: 'StudentDetail',
    component: StudentDetail,
    props:true
  },
  {
    path: '/Attendence/:id',
    name: 'Attendence',
    component: Attendence,
    props:true
  },
  {
    path: '/exams/:id',
    name: 'exams',
    component: Exams,
    props:true
  },
  {
    path: '/fees/:id',
    name: 'fees',
    component: fees,
    props:true
  },
  {
    path: '/submit',
    name: 'submit',
    component: submit
  },
  {
    path: '/forgot',
    name: 'forgotpassword',
    component: forgotpassword
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
