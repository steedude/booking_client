import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import DashboardLayout from '@/components/layout/DashboardLayout.vue';

import ReservationPage from '@/pages/ReservationPage.vue';
import AuthenticationPage from '@/pages/AuthenticationPage.vue';
import UserPage from '@/pages/UserPage.vue';

import { useUserStore } from '@/stores';

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

// 全局路由守衛 攔截所有路由
router.beforeEach((to, from, next) => {
  // 取得token
  const { getToken } = useUserStore();
  const token = getToken();

  // 有token
  if (token) {
    // 放行
    return next();
  }
  // 否則沒有token
  // 如果去的登陸
  if (to.path === '/auth') {
    // 放行
    return next();
  }
  // 如果去的是其他頁,跳轉到登陸
  return next({ path: '/auth' });
});

export default router;
