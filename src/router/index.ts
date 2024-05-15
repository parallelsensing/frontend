import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/components/home-view.vue';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/home',
    component: Home,
    props: true
  },
  {
    name: 'login',
    path: '/',
    component: () => import('@/views/Login-view.vue'),
    props: true
  },
  {
    path: '/point',
    name: 'point',
    component: () => import('@/views/point-view.vue'),
    props: true
  },
  // {
  //   path: '/ros',
  //   name: 'ros',
  //   component: () => import('@/pages/ros-3d.vue'),
  //   props: true
  // },
  // {
  //   path: '/rostest',
  //   name: 'rostest',
  //   component: () => import('@/pages/ros-test.vue'),
  //   props: true
  // },
  {
    path: '/big',
    name: 'big',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/index.vue')
      }
    ]
  },

  {
    name: 'Map',
    path: '/map',
    component: () => import('@/views/map-view.vue'),
    props: true
  },

  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404-view.vue')
  }
];

const history = createWebHistory();
const router = createRouter({
  history,
  routes
});

export default router;
