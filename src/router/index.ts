import { createRouter, createWebHistory } from 'vue-router';
import HomeEntre from '@/pages/home-entre.vue';
import NotFound from '@/pages/error-404.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeEntre
    },
    {
      path: '/work',
      name: 'work',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/main-surface.vue')
    },
    {
      name: '404',
      path: '/404',
      component: NotFound
    },
    {
      path: '/:catchAll(.*)', // 此处需特别注意至于最底部
      redirect: '/404'
    }
  ]
});

export default router;
