import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { errorAlert } from '@/utils/alert';
// import Home from '@/components/home-view.vue';
const Layout = () => import("@/layout/index.vue");

const routes: Array<RouteRecordRaw> = [
  // {
  //   name: 'home',
  //   path: '/home',
  //   component: Home,
  //   props: true
  // },
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login-view.vue'),
    props: true
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register-view.vue'),
    props: true
  },

  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'assistant',
        name: 'assistant',
        component: () => import('@/views/sceneAssistant.vue'),
      },
      {
        path: 'pointscene',
        name: 'pointscene',
        component: () => import('@/views/scene/index.vue'),
        meta: { hidden: true, title: "点云大场景" },
      },
      {
        path: 'keyframe',
        name: 'keyframe',
        component: () => import('@/views/key-frame.vue'),
      },
      {
        path: 'databoard',
        name: 'databoard',
        component: () => import('@/views/HomeView.vue'),
        children: [
          {
            path: 'index',
            name: 'index',
            component: () => import('@/views/index/index.vue')
          }],
        props: true
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
    path: '/ros3d',
    name: 'ros3d',
    component: () => import('@/views/ros-3d.vue'),
    props: true
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('@/views/scene/components/PointCloud.vue'),
    props: true
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404-view.vue')
  }
  , {
    name: 'test',
    path: '/test',
    component: () => import('@/views/test.vue')
  }
];

const history = createWebHistory();
const router = createRouter({
  history,
  routes
});

// router.beforeEach((to, from) => {
//   if ((to.name !== 'login' && to.name !== 'register') && !localStorage.getItem('TOKEN')) {
//     errorAlert(`请先登录，跳转至登录页`);
//     return { path: '/login' };
//   }
//   return true;
// });

export default router;