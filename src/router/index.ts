import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/views/layouts/DefaultLayout.vue'
import BlankLayout from '@/views/layouts/BlankLayout.vue'
import { isLogin } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: 'space/apps',
          name: 'space-apps-list',
          component: () => import('@/views/space/apps/ListView.vue'),
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/pages/HomeView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: BlankLayout,
      children: [
        {
          path: 'auth/login',
          name: 'auth-login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'space/apps/:app_id',
          name: 'space-app-detail',
          component: () => import('@/views/space/apps/DetailView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!isLogin() && to.name !== 'auth-login') {
    return { path: '/auth/login' }
  }
  next()
})
export default router
