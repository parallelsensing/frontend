import { createRouter, createWebHistory,  } from "vue-router";
import type { RouteRecordRaw } from 'vue-router';
import Home from "@/components/home-view.vue";


const routes: Array <RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: Home,
    props: true,
  },
  {
    name: 'login',
    path: '/login',
    component: ()=>import('@/pages/Login-view.vue'),
    props: true,
  },

  {
    name: 'Map',
    path: '/map',
    component: ()=>import('@/pages/map-view.vue'),
    props: true,
  },

  // {
  //   path: '/bigScreen',
  //   name: 'bigScreen',
  //   component: () => import(/* webpackChunkName: "LSD.bighome" */ '@/views/view-home.vue'),
  //   children:[
  //     {
  //       path: '/index',
  //       name: 'index',
  //       component: () => import(/* webpackChunkName: "LSD.bighome" */ '@/views/indexs/view-index.vue'),
  //     }
  //   ]
  // }, 

  {
    name: 'platform',
    path: '/platform',
    component: ()=>import('@/pages/platform-view.vue'),
    props: true,
    meta: { title: 'model' }
  },
  {
    name: '404',
    path: '/404',
    component: ()=>import('@/pages/404-view.vue'),
  },

];

const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

export default router;