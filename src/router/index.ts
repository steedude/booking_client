import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import DashboardLayout from '@/components/layout/DashboardLayout.vue';

import ReservationPage from '@/pages/ReservationPage.vue';
import AuthenticationPage from '@/pages/AuthenticationPage.vue';
import UserPage from '@/pages/UserPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: '/reservation',
  },
  {
    path: '/auth',
    name: 'authentication',
    component: AuthenticationPage,
    meta: {
      title: '驗證',
    },
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/reservation',
    children: [
      {
        path: '/reservation',
        name: 'reservation',
        component: ReservationPage,
        meta: {
          title: '預約管理',
        },
      },
      {
        path: '/user',
        component: UserPage,
        name: 'user',
        meta: {
          title: '用戶資料',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
