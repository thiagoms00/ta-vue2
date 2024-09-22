// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path:'/login',
    name:'Login',
    component: () => import("@/views/Login.vue"),
  },
  {
    path:'/profLogin',
    name:'ProfLogin',
    component: () => import("@/views/ProfLogin.vue"),
  },
  {
    path:'/testStart',
    name:'TestStart',
    component: () => import("@/views/TestStart.vue"),
  },
  {
    path:'/turma',
    name:'Turma',
    component: () => import("@/views/Turma.vue"),
  },
  {
    path:'/welcome',
    name:'Welcome',
    component: () => import("@/views/Welcome.vue"),
  },
  {
    path:'/congratulations',
    name:'Congratulations',
    component: () => import("@/views/Congratulations.vue"),
  },

  {
    path: '/admin',
    name: 'Admin',
    component: () => import("@/views/Admin.vue"),
  },
 
  {
    path: '/itens',
    name: 'Itens',
    component: () => import("@/views/Itens.vue"),
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
