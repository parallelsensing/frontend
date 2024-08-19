import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { errorAlert } from '@/utils/alert';
import { reqUserInfo } from '@/api/user';
const Layout = () => import("@/layout/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/Login-view.vue'),
    props: true
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/register/Register-view.vue'),
    props: true
  },

  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'assistant',
        name: 'assistant',
        component: () => import('@/views/scene-Assistant/sceneAssistant.vue'),
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
        component: () => import('@/views/key-frame/key-frame.vue'),
      },
      {
        path: 'databoard',
        name: 'databoard',
        component: () => import('@/views/dashboard/index.vue'),
        children: [
          {
            path: 'index',
            name: 'index',
            component: () => import('@/views/dashboard/index/index.vue')
          }],
        props: true
      }
    ]
  },
  {
    name: 'Map',
    path: '/map',
    component: () => import('@/views/map/map-view.vue'),
    props: true
  },
  {
    path: '/ros3d',
    name: 'ros3d',
    component: () => import('@/views/scene/components/ros-3d.vue'),
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

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem('token');
  if (to.name !== 'login' && to.name !== 'register') {
    if (!token) {
      errorAlert('请先登录，跳转至登录页');
      return { path: '/login' };
    } else {
      try {
        const userInfo = await reqUserInfo(); // 请求用户信息，验证 token 的合法性
        if (userInfo) {
          return true;
        } else {
          errorAlert('登录信息已过期，请重新登录');
          return { path: '/login' };
        }
      } catch (error) {
        // 请求失败或其他错误，跳转到登录页
        errorAlert('验证失败，请重新登录');
        return { path: '/login' };
      }
    }
  }

  return true;
});

export default router;