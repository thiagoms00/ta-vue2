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

  {
    path: '/loginlogin',
    name: 'LoginLogin',
    component: () => import("@/views/LoginLogin.vue"),
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})
router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})


export default router
