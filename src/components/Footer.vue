<template>
  <div id="footer" class="container-fluid">
    <div class="header-nav container hidden-xs">
      <!-- 导航logo -->
      <div class="header-nav-logo">
        <img src="@/assets/img/logo_white.png"
        @click = "jumptomain"/>
      </div>
      <!-- 导航内容 -->
      <ul class="header-nav-wrapper">
        <li
          v-for="(item, index) in navList"
          :key="index"
          :class="index == navIndex ? 'active' : ''"
          @click="navClick(index, item.name)"
        >
          <router-link :to="item.path">
            {{ item.name }}
            <span
              v-if="item.children.length > 0"
              class="glyphicon glyphicon-menu-down"
            ></span>
            <i class="underline"></i>
          </router-link>
          <dl v-if="item.children.length > 0">
            <dt v-for="(i, n) in item.children" :key="n">
              <router-link :to="i.path">{{ i.name }}</router-link>
            </dt>
          </dl>
        </li>
      </ul>
    </div>
    <p class="address_tel_fax">
      <p>地址：{{ address }}</p>
      <p>QQ群：<a style="color:#fff" target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=ce9f5f0d1d7553fb5634521f79a89668ad0d798eb35047f93300df63ebae4c05">{{ qqgroup }}</a></p>
    </p>
    <p class="email_wx">
      <p>博客：<a :href='blog + "neveryu/"' style="color:#fff">{{ blog }}</a></p>
      <p>邮箱：{{ email }}</p>
      <p>微信：{{ qq }}</p>
    </p>
    <p class="copy">Copyright &copy; 2018 - Now {{ company }}</p>
  </div>
</template>

<script setup name="Footer">
const address = import.meta.env.VITE_APP_ADDRESS
const phone = import.meta.env.VITE_APP_PHONE
const email = import.meta.env.VITE_APP_EMAIL
const qq = import.meta.env.VITE_APP_QQ
const company = import.meta.env.VITE_APP_COMPANYNAME
const blog = import.meta.env.VITE_APP_BLOG
const qqgroup = import.meta.env.VITE_APP_QQGROUP
import { ref, reactive } from 'vue'
const navIndex = ref('')
navIndex.value = sessionStorage.getItem('navIndex')
  ? sessionStorage.getItem('navIndex')
  : 0
const menuName = ref('首页')
const menuClass = ref('glyphicon glyphicon-menu-down')
const navList = [
  {
    name: '首页',
    path: '/',
    children: []
  },
  {
    name: '软件产品',
    path: '/software',
    children: [
      {
        name: '智能雷达',
        path: '/software/smartTown'
      },
      {
        name: '大数据管理系统',
        path: '/software/bigData'
      }
    ]
  },
  {
    name: '应用行业',
    path: '/service',
    children: []
  },
  {
    name: '新闻中心',
    path: '/newsinformation',
    children: []
  },
  {
    name: '关于我们',
    path: '/companyintroduction',
    children: []
  },
  {
    name: '工作机会',
    path: '/jobchance',
    children: []
  },
  {
    name: '联系我们',
    path: '/contactus',
    children: []
  }
]
function navClick(index, name) {
  navIndex.value = index
  sessionStorage.setItem('navIndex', index)
  menuName.value = name
}
function jumptomain(){
    router.push({path:'/HomePage'})
}
function menuClick() {
  if (menuClass.value == 'glyphicon glyphicon-menu-down') {
    menuClass.value = 'glyphicon glyphicon-menu-up'
  } else {
    menuClass.value = 'glyphicon glyphicon-menu-down'
  }
}
import Footer_link from '@/components/Header.vue'
</script>

<style scoped>
/* 顶部 */
#header {
  background: #474747;
  transition: all ease 0.6s;
}

#footer .header-top {
  height: 50px;
  color: #fff;
  font-size: 12px;
  line-height: 50px;
  background: #474747;
}

/* 顶部的图标 */
#footer .header-top span {
  margin: 0 8px;
}

/* 导航栏 */
#footer .header-nav {
  height: 110px;
}

/* 导航栏logo */
#footer .header-nav .header-nav-logo {
  width: 100px;
  height: 100%;
  float: left;
  position: relative;
}

/* 导航栏logo图片 */
#footer .header-nav .header-nav-logo img {
  width: 150px;
  height: 45px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

/* 导航栏 导航容器 */
#footer .header-nav-fixed .header-nav-wrapper {
  line-height: 50px;
}

#footer .header-nav .header-nav-wrapper {
  line-height: 110px;
  float: right;
  margin: 0;
  max-width: 800px;
}

/* 导航栏 每个导航 */
#footer .header-nav .header-nav-wrapper > li {
  float: left;
  margin: 0 15px;
  position: relative;
}

/* 导航栏 每个导航下面的 a 链接 */
#footer .header-nav .header-nav-wrapper > li > a {
  color: #d3d3d3;
  font-size: 15px;
  font-weight: bold;
  padding: 15px 0;
  position: relative;
}

/* 导航栏 每个导航下面的 a 链接的下划线 */
#footer .header-nav .header-nav-wrapper > li > a > i {
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  transition: all 0.6s ease;
  background-color: #50a4ec;
}

/* 导航栏 每个导航下面的 a 链接的右侧小三角 */
#footer .header-nav .header-nav-wrapper > li > a > span {
  font-size: 12px;
  transition: transform ease 0.5s;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去的样式 */
#footer .header-nav .header-nav-wrapper > li > a:hover {
  color: #50a4ec;
  text-decoration: none;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去下划线的样式 */
#footer .header-nav .header-nav-wrapper > li > a:hover .underline {
  opacity: 1;
  width: 100%;
  left: 0;
}

/* 导航栏 每个导航下面的 a 链接 鼠标滑上去三角标的样式 */
#footer .header-nav .header-nav-wrapper > li > a:hover span {
  transform: rotate(180deg);
}

/* 导航栏 每个导航下面的 a 链接 鼠标点击后的样式 */
#footer .header-nav .header-nav-wrapper > li.active > a {
  color: #50a4ec;
  text-decoration: none;
  border-bottom: 2px solid #50a4ec;
}

/* 导航栏 每个导航下面的二级导航容器 */
#footer .header-nav .header-nav-wrapper > li > dl {
  display: none;
  position: absolute;
  width: 168px;
  top: 80%;
  left: 0;
  z-index: 999999;
  box-shadow: 0 0 3px 1px #ccc;
  background: #fff;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 */
#footer .header-nav .header-nav-wrapper > li > dl > dt {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

/* 导航栏 每个导航下面的二级导航容器的每个导航 当鼠标滑上时的样式*/
#footer .header-nav .header-nav-wrapper > li > dl > dt > a:hover {
  text-decoration: none;
}

/* 导航栏 滑上一级导航显示二级导航 */
#footer .header-nav .header-nav-wrapper > li:hover dl {
  display: block;
}

#footer .header-nav .header-nav-wrapper > li > dl > dt:hover {
  cursor: pointer;
  background: #ccc;
}

@media screen and (max-width: 997px) {
  #footer .header-nav-m {
    position: relative;
  }

  /* 导航栏logo容器 */
  #footer .header-nav-m .header-nav-m-logo {
    height: 80px;
    position: relative;
  }

  /* 导航栏logo图片 */
  #footer .header-nav-m .header-nav-m-logo img {
    width: 95px;
    height: 45px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  /* 导航栏  菜单容器 */
  #footer .header-nav-m .header-nav-m-menu {
    color: #fff;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    background: #474747;
    position: relative;
  }

  /* 导航栏 菜单图标 */
  #footer .header-nav-m .header-nav-m-menu-wrapper {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -20px;
    width: 50px;
    height: 40px;
    color: #fff;
    z-index: 999999;
    font-size: 12px;
  }

  /* 导航栏 */
  #footer .header-nav-m .header-nav-m-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background: #474747;
    z-index: 9999999;
  }

  /* 导航栏 每个导航 */
  #footer .header-nav-m .header-nav-m-wrapper > li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }

  /* 导航栏 每个导航下面的 a 链接 */
  #footer .header-nav-m .header-nav-m-wrapper > li > a {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 15px 0;
    position: relative;
  }

  /* 导航栏 每个导航下面的 a 链接的右侧小三角 */
  #footer .header-nav .header-nav-wrapper > li > a > span {
    font-size: 10px;
  }
}
#footer {
  width: 100%;
  height: 100%;
  color: #fff;
  background: #474747;
  overflow: hidden;
  text-align: center;
}

.logo {
  width: 95px;
  height: 45px;
  margin: 50px auto 20px;
  position: relative;
  left: -40px; /* 向左移动20像素 */
}
.logo img{
  width: 200px;
  height: 45px;

}
.title {
  font-size: 25px;
  margin-bottom: 20px;
}

.address_tel_fax {
  color: #d3d3d3;
  font-size: 14px;
  margin: 10px 0;
}

.email_wx {
  color: #d3d3d3;
  font-size: 14px;
}

.copy {
  color: #d3d3d3;
  font-size: 14px;
  margin: 50px 0 10px;
}

@media screen and (max-width: 997px) {
  .title {
    font-size: 20px;
  }

  .address_tel_fax {
    font-size: 12px;
  }

  .email_wx {
    font-size: 12px;
  }

  .copy {
    font-size: 12px;
    margin: 30px 0 10px;
  }
}
</style>

