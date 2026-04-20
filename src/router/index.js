import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { layout: 'guest' }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import('@/views/users/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: () => import('@/views/users/Form.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users/:id/edit',
    name: 'UserEdit',
    component: () => import('@/views/users/Form.vue'),
    meta: { requiresAuth: true },
    props: true // Позволяет передать :id как переменную в компонент
  },
  {
    path: '/locations',
    name: 'Locations',
    component: () => import('@/views/locations/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/locations/create',
    name: 'LocationCreate',
    component: () => import('@/views/locations/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/locations/:id/edit',
    name: 'LocationEdit',
    component: () => import('@/views/locations/Index.vue'),
    meta: { requiresAuth: true },
    props: true // Позволяет передать :id как переменную в компонент
  },
  {
    path: '/devices',
    name: 'Devices',
    component: () => import('@/views/devices/Index.vue'),
    meta: { requiresAuth: true }
  }, 
    {
    path: '/devices/create',
    name: 'DeviceCreate',
    component: () => import('@/views/devices/Index.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/devices/:id/edit',
    name: 'DevicesEdit',
    component: () => import('@/views/devices/Index.vue'),
    meta: { requiresAuth: true },
    props: true // Позволяет передать :id как переменную в компонент
  },
  {
    path: '/me/',
    name: 'Me',
    component: () => import('@/views/me/Index.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Защита роутов
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 1. Если страница требует авторизации, а токена нет -> на Login
  if (requiresAuth && !token) {
    return next({ name: 'Login' });
  }

  // 2. Если пользователь залогинен и пытается зайти на Login -> на Dashboard
  if (to.name === 'Login' && token) {
    return next({ name: 'Dashboard' });
  }

  // В остальных случаях — пропускаем
  next();
});

export default router;