import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';

const routes = [
  {
    path: '/',
    redirect: '/banks-management',
  },
  {
    path: '/banks-management',
    name: 'Main',
    component: Main,
  },
  {
    path: '/mortgage-calculator',
    name: 'Calculator',
    component: () => import('../views/Calculator.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
