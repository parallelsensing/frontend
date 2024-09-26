import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { errorAlert, successAlert } from '@/utils/alert';
import { reqUserInfo, forgetPasswordUseToken } from '@/api/user';
const Layout = () => import('@/layout/index.vue');

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
    name: 'forgetpassword',
    path: '/forgetpassword',
    component: () => import('@/views/forget-password/ForgetPassword-view.vue'),
    props: true
  },
  {
    name: 'forgetpasswordcheck',
    path: '/forgetpasswordcheck',
    component: () => import('@/views/forget-password/ForgetPasswordCheck-view.vue'),
    props: true
  },
  {
    name: 'reset-password',
    path: '/account/reset-password',
    component: () => import('@/views/forget-password/ForgetPassword-view.vue'),
    props: (route) => ({ token: route.query.token }) // 将 query 参数传递给组件
  },

  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'assistant',
        name: 'assistant',
        component: () => import('@/views/scene-Assistant/sceneAssistant.vue')
      },
      {
        path: 'pointscene',
        name: 'pointscene',
        component: () => import('@/views/scene/index.vue'),
        meta: { hidden: true, title: '点云大场景' }
      },
      {
        path: 'keyframe',
        name: 'keyframe',
        component: () => import('@/views/key-frame/key-frame.vue')
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
          }
        ],
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
  },
  {
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
  // console.log(to);
  // console.log(window.location.href); // 打印当前完整 URL

  if (to.name == 'reset-password') {
    console.log(to); // 打印 token 参数
    const tokenStartIndex = to.fullPath.indexOf('token=');
    let tokenValue = null;
    if (tokenStartIndex !== -1) {
      tokenValue = to.fullPath.substring(tokenStartIndex + 6); // 6 是 "token=".length
    }
    // const token2: any = to.query.token;
    console.log('token2', tokenValue);
    const result: any = await forgetPasswordUseToken(tokenValue);
    console.log('result', result);
    if (result.code == 200) {
      successAlert('请在一分钟内完成密码重置');
    } else {
      errorAlert('token已过期或不存在');
      // return { path: '/login' };
    }
  } else if (
    to.name !== 'login' &&
    to.name !== 'register' &&
    to.name !== 'forgetpassword' &&
    to.name !== 'reset-password' &&
    to.name !== 'forgetpasswordcheck'
  ) {
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
