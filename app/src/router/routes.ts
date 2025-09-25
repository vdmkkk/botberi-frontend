import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/profile' },
      { path: 'bots', name: 'bots', component: () => import('pages/main/BotsPage.vue') },
      {
        path: 'instances',
        name: 'instances',
        component: () => import('pages/main/InstancesPage.vue'),
      },
      {
        path: 'instances/create-instance/:bot_id',
        name: 'create-instance',
        component: () => import('pages/main/CreateInstancePage.vue'),
      },
      {
        path: 'instances/instance/:instance_id',
        name: 'instance',
        component: () => import('pages/main/InstancePage.vue'),
      },
      { path: 'profile', name: 'profile', component: () => import('pages/main/ProfilePage.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/auth/LoginPage.vue') },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: () => import('pages/auth/ChangePasswordFormPage.vue'),
      },
      {
        path: 'change-password/:access_token',
        name: 'change-password-confirm',
        component: () => import('pages/auth/ChangePasswordConfirmPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
