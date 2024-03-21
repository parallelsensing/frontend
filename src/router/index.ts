import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import NotFound from "../pages/404.vue"
import Platform from "../pages/Platform.vue";
import Home from "../components/Home.vue";
import Login from "../pages/Login.vue";

const routes: Array <RouteRecordRaw> = [
  {
    name: 'login',
    path: '/',
    component: Login,
    props: true,
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    props: true,
  },

  {
    name: 'platform',
    path: '/platform',
    component: Platform,
    props: true,
    meta: { title: 'model' }
  },
  {
    name: '404',
    path: '/404',
    component: NotFound
  },
];

const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});
// router.beforeEach((to, _from, next) => {
//   if (to.meta.title) {
//     document.title = `IEEE ITSC 2022 | ${to.meta.title}`;
//   }
//   next();
// });

export default router;