<template>
  <div id="HomePage">
    <section class="HomePage-banner">
      <!--视频页面-->
      <div class="HomePage-banner-img">
        <img id="banner-img"
          autoplay="" loop="" playsinline="" muted="" style="width:100%;margin-top:20px;"
          src="@/assets/img/banner.jpg">
        </img>
        <div class="HomePage-banner-text">
          <h1>
            <span >塑造认知传感<br></span>
            <span >开拓时空智能</span>
          </h1>
          <button
              @click = "jumpto_product"
              class="btn btn-default btn-sm"
              onmouseenter="this.style.borderColor='#ffffff'; this.style.backgroundColor='#ffffff'; this.style.color='#3f3f3f';"
              onmouseleave="this.style.backgroundColor='transparent'; this.style.borderColor='#ffffff'; this.style.color='#ffffff';"
            >
            了解更多
          </button>
        </div>
      </div>
    </section>

    <!-- 轮播图 -->
    <div class = "swiper-container">
      <swiper
        id="swiper"
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        navigation
        lazy
        loop
        autoplay
        :pagination="{
          clickable: true
        }"
      >
        <swiper-slide
          class="banner-swiper"
          v-for="(item, index) in swiperList"
          :key="index"
        >
          <img class="swiper-lazy" :data-src="item.img" alt="轮播图" />
          <div class="swiper-lazy-preloader"></div>
          <div class="swiper-slide-title">
            <h1>{{ item.title }}</h1>
            <p>{{ item.content }}</p>
          </div>
        </swiper-slide>
      </swiper>
      <div class ="swiper-static-title">
        <h1>应用领域:</h1>
      </div>
    </div>
    <!--产品介绍-->
    <div class="image-stack">
      <div class="image-item" v-for="(image, index) in images" :key="index" :class="['image-item-' + index]">
        <img :src="image" alt="">
      </div>
    </div>
    <!-- 大数据管理系统
    <div id="bigData" class="container-fuild">
      <div class="row bigData-container">
        <div class="col-xs-12 col-sm-12 col-md-6 wow zoomIn">
          <img
            class="img-responsive"
            src="@/assets/img/img1.png"
            alt="大数据管理系统"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <h2 class="bigData-title">
            智能雷达
            <small>/ Lidar</small>
          </h2>
          <p>
            简介1
          </p>
          <p>
            简介2
          </p>
          <h2 class="bigData-device">PC/PAD/Phone &nbsp; 全设备支持</h2>
          <a href="javascript:;" class="btn btn-lg btn-block btn-info"
            >联系我们</a
          >
        </div>
      </div>
    </div>-->

    <!-- 您身边的IT专家
    <div id="contactUs" class="container-fuild text-center">
      <div class="container contactUs-container wow slideInUp">
        <h1>您身边的IT专家</h1>
        <h3>7x24小时提供出色的IT服务</h3>
        <button
          class="btn btn-default btn-sm"
          onmouseleave="this.style.borderColor='#ffffff'; this.style.backgroundColor='#ffffff'; this.style.color='#3f3f3f';"
          onmouseenter="this.style.backgroundColor='transparent'; this.style.borderColor='#ffffff'; this.style.color='#ffffff';"
        >
          联系我们
        </button>
        <div class="contactUs-contactWay">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>-->

    <!-- 客户评价
    <div id="customer" class="container-fuild">
      <div class="container customer-container">
        <p class="customer-title text-center">客户评价</p>
        <swiper
          class="swiper-container customer-swiper hidden-xs"
          :modules="modules"
          :slides-per-view="1"
          :space-between="0"
          navigation
          loop
          autoplay
          :pagination="{
            clickable: true
          }"
        >
          <swiper-slide
            class="swiper-slide customer-block"
            v-for="(item, index) in customerList"
            :key="index"
          >
            <div class="customer-logo">
              <img class="center-block" :src="item.logo" alt="logo" />
            </div>
            <div class="customer-yh">
              <img src="@/assets/img/yinhao.png" alt="引号" />
            </div>
            <div class="customer-content1">
              <small>{{ item.content }}</small>
            </div>
            <div class="customer-content2">{{ item.title }}</div>
          </swiper-slide>
        </swiper>

        <div class="row visible-xs customer-block">
          <div
            class="col-xs-12"
            v-for="(item, index) in customerList"
            :key="index"
          >
            <div class="customer-logo">
              <img class="center-block" :src="item.logo" alt="logo" />
            </div>
            <div class="customer-yh">
              <img src="@/assets/img/yinhao.png" alt="引号" />
            </div>
            <div class="customer-content1">
              <small>{{ item.content }}</small>
            </div>
            <div class="customer-content2">
              <small>{{ item.title }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 为什么选择我们 -->
    <div id="whyChooseUs" class="conatiner-fuild">
      <div class="container">
        <div class="whyChooseUs-title text-center">
          <p>新闻资讯</p>
          <p>NEWS</p>
        </div>
        <!--
        <div class="row">
          <div
            class="col-xs-12 col-sm-6 col-md-3 server-wrapper"
            v-for="(item, index) in serverList"
            :key="index"
          >
            <div
              class="server-block wow slideInUp"
              onmouseenter="this.style.color='#28f';this.style.borderColor='#28f'"
              onmouseleave="this.style.color='#666';this.style.borderColor='#ccc'"
            >
              <img class="center-block" :src="item.logo" alt="logo" />
              <p class="text-center">{{ item.title }}</p>
              <div
                class="text-center"
                v-html="item.content"
                onmouseenter="this.style.color='#28f'"
                onmouseleave="this.style.color='#ccc'"
              ></div>
            </div>
          </div>
        </div>-->
        <NewsContainer>
        </NewsContainer>
      </div>
    </div>


  </div>
</template>

<script setup name="HomePage">
import WOW from 'wow.js'
import { getCurrentInstance, onMounted } from 'vue'
// import Swiper from 'swiper'
import { Navigation, Pagination, Scrollbar, A11y, Lazy, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/lazy'
import 'swiper/css/autoplay'
import { useRouter } from 'vue-router'

import NewsContainer from '@/components/ClickableContain.vue'
import swiper1 from '@/assets/img/swiper1.png'
import swiper2 from '@/assets/img/swiper2.png'
import product1 from '@/assets/img/products1.png'
import product2 from '@/assets/img/products2.png'
import product3 from '@/assets/img/products3.png'
import logo_hp from '@/assets/img/logo_hp.png'
import logo_kk from '@/assets/img/logo_kk.png'
import logo_toyota from '@/assets/img/logo_toyota.png'

import img_tel from '@/assets/img/tel.png'
import img_computer from '@/assets/img/computer.png'
import img_qq from '@/assets/img/qq.png'
import img_skill from '@/assets/img/skill.png'
const router = useRouter();
const swiperList = [
  {
    img: swiper1,
    title: '',
    content: ''
  },
  {
    img: swiper2,
    title: '',
    content: ''
  },
  {
    img: swiper1,
    title: '',
    content: ''
  },
  {
    img: swiper2,
    title: '',
    content: ''
  }
]
const images =[
  product1,
  product2,
  product3
]
const modules = [Navigation, Pagination, Scrollbar, A11y, Lazy, Autoplay]

const customerList = [
  {
    logo: logo_hp,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_kk,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_toyota,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_kk,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_hp,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_toyota,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_kk,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_hp,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_toyota,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_hp,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_kk,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  },
  {
    logo: logo_hp,
    title:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。',
    content:
      '您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。您可以双击这里或者点击编辑按钮来修改内容。您还可以添加图标，按钮，图片等常用元素。'
  }
]

const serverList = [
  {
    logo: img_tel,
    title: '核心优势1',
    content: '<p>由专业客服提供人工服务</p>负责疑难问题和故障受理'
  },
  {
    logo: img_computer,
    title: '核心优势2',
    content: '<p>利用远程视频工具，提供协助</p>帮助客户进行调试、解决故障'
  },
  {
    logo: img_qq,
    title: '核心优势3',
    content: '<p>利用企业QQ提供在线解答</p>帮助企业快速准确解决问题和故障'
  },
  {
    logo: img_skill,
    title: '核心优势4',
    content: '<p>由技术支持工程师，负责问题解答</p>需求受理及故障受理'
  }
]
function jumpto_product(){
    router.push({path:'/software'})
}
// const { proxy } = getCurrentInstance() //获取上下文实例，ctx=vue2的this
onMounted(() => {
  // console.log('mounted', proxy)
  // console.log(proxy.$wow, '------')
  /* wowjs动画 */
  new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
  }).init()
})
</script>

<style scoped>
/* 整体盒子 */
#HomePage {
  width: 100%;
}
.HomePage-banner{
  position: relative;
}
.HomePage-banner-text{
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  /*background-color: rgba(0, 0, 0, 0.5);*/

}
.HomePage-banner-text p{
  font-size: 120px;
  pointer-events: none; /* 让文字不遮挡视频的交互*/
}
.HomePage-banner-text h1{
  font-size: 88px;
  font-weight: bolder;
  pointer-events: none; /* 让文字不遮挡视频的交互*/
}
.HomePage-banner-text button{
  width: 200px;
  height: 50px;
  margin-top: 40px;
  border-radius: 40px;
  font-size: 20px;
}
.HomePage-banner-text button:hover{
  background-color: #ccc;
}
.swiper-container {
  position: relative;
}
.swiper-static-title{
  position: relative;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #000000;
  z-index: 1;
  pointer-events: none; /* 让文字不遮挡视频的交互*/
  >h1{font-size: 44px;}
}
/* 顶部轮播图 */
#swiper {
  width: 100%;
  height: 100%;
}

#swiper .banner-swiper {
  width: 100%;
  height: 100%;
  position: relative;
}

#swiper .banner-swiper img {
  width: 100%;
  height: 100%;
}

#swiper .banner-swiper .swiper-slide-title {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
  width: 100%;
  height: 100%;
  color: #fff;
  /*background: rgba(51, 51, 51, 0.534);*/
  text-align: center;
  line-height: 80px;
}

#swiper .banner-swiper .swiper-slide-title > h1 {
  font-size: 50px;
  margin-top: 12%;
}

#swiper .banner-swiper .swiper-slide-title > p {
  font-size: 20px;
  margin-top: 1%;
  font-weight: 700;
}
.image-stack {
  top:40px;
  position:relative;
  width: 100%; /* 设置容器宽度 */
  height: 800px; /* 设置容器高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-item {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-item-0 {
  left: 0;
  clip-path: polygon(0 0, 33.33% 0, 33.33% 100%, 0 100%);
  transition: transform 0.3s ease-in-out;
  transform-origin: 16.67% center; /* 设置缩放中心点为图片中心 */
  flex-shrink: 0;
}

.image-item-1 {
  left: 0;
  clip-path: polygon(33.33% 0, 66.67% 0, 66.67% 100%, 33.33% 100%);
  transition: transform 0.3s ease-in-out;
  transform-origin: 50% center; /* 设置缩放中心点为图片中心 */
  flex-shrink: 0;
}

.image-item-2 {
  left: 0;
  clip-path: polygon(66.67% 0, 100% 0, 100% 100%, 66.67% 100%);
  transition: transform 0.3s ease-in-out;
  transform-origin: 83.33% center; /* 设置缩放中心点为图片中心 */
  flex-shrink: 0;
}
.image-item-0:hover {
  transform: scale(1.1);
}

.image-item-1:hover {
  transform: scale(1.1);
}

.image-item-2:hover {
  transform: scale(1.1);
}
.image-item img {
  width: 100%;
  height: 100%;
}
/* 大数据管理系统 */
#bigData {
  padding: 100px;
  transition: all ease 0.6s;
  box-sizing: border-box;
}

#bigData .bigData-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

#bigData p {
  font-size: 14px;
  color: #333;
  line-height: 2rem;
}

#bigData .bigData-device {
  margin: 50px 0 20px;
}

/* 您身边的IT专家 */
#contactUs {
  color: #fff;
  height: 400px;
  background: url('../assets/img/contact_us_bg.jpg') 0 0 no-repeat;
  background-size: 100% 100%;
  transition: all ease 0.6s;
}

#contactUs .contactUs-container {
  padding-top: 50px;
}

#contactUs .contactUs-container button {
  width: 300px;
  height: 50px;
  margin-top: 40px;
}

#contactUs .contactUs-container .contactUs-contactWay span {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin: 30px;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(1) {
  background: url('../assets/img/weixin.png') 0 0 no-repeat;
  background-size: 100% 100%;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(2) {
  background: url('../assets/img/weibo.png') 0 0 no-repeat;
  background-size: 100% 100%;
}

#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(3) {
  background: url('../assets/img/twitter.png') 0 0 no-repeat;
  background-size: 100% 100%;
}

/* 客户评价 */
#customer {
  padding: 50px 0;
  box-sizing: border-box;
  background: #efefef;
  transition: all ease 0.6s;
}

#customer .customer-title {
  font-size: 30px;
  color: rgb(102, 102, 102);
  margin: 0 0 30px;
}

#customer .customer-block {
  background: #fff;
  padding: 30px 80px;
}

#customer .customer-logo img {
  width: 94px;
  height: 94px;
  border: 1px solid #ccc;
}

#customer .customer-yh img {
  width: 34px;
  height: 34px;
}

#customer .customer-content1 {
  padding-bottom: 20px;
  border-bottom: 1px solid #0ce9f1;
}

#customer .customer-content2 {
  padding-top: 20px;
}

/* 为什么选择我们 */
#whyChooseUs {
  padding: 100px;
}

#whyChooseUs .whyChooseUs-title {
  margin-bottom: 50px;
}

#whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
  font-size: 25px;
  font-weight: 500;
}

#whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
  font-size: 14px;
}

#whyChooseUs .server-block {
  padding: 50px 20px;
  border: 1px solid #ccc;
  border-bottom: 5px solid #ccc;
}

#whyChooseUs .server-block img {
  width: 48px;
  height: 48px;
}

#whyChooseUs .server-block > p {
  font-size: 20px;
  margin: 30px 0;
}

#whyChooseUs .server-block > div {
  color: #ccc;
}

/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
  #swiper {
    height: 200px;
  }

  #bigData {
    padding: 30px;
  }

  #bigData .bigData-title {
    font-size: 20px;
  }

  #bigData .bigData-device {
    font-size: 20px;
    margin: 10px 0 10px;
  }

  #contactUs {
    height: 200px;
    transition: all ease 0.6s;
  }

  #contactUs .contactUs-container {
    padding-top: 0;
  }

  #contactUs .contactUs-container h1 {
    font-size: 25px;
  }

  #contactUs .contactUs-container h3 {
    font-size: 18px;
  }

  #contactUs .contactUs-container button {
    width: 200px;
    height: 30px;
    margin-top: 20px;
  }

  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin: 10px;
  }

  #customer {
    padding: 30px 0;
    box-sizing: border-box;
    background: #fff;
  }

  #customer .customer-title {
    font-size: 16px;
    font-weight: bold;
  }

  #customer .customer-logo img {
    width: 48px;
    height: 48px;
  }

  #customer .customer-block {
    padding: 30px;
  }

  #customer .customer-block > div {
    padding: 30px 0;
  }

  #whyChooseUs {
    padding: 20px 0;
    transition: all ease 0.6s;
  }

  #whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 700;
  }

  #whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
    font-size: 12px;
  }

  #whyChooseUs .server-block {
    padding: 50px 0;
    border: 1px solid #ccc;
    border-bottom: 5px solid #ccc;
  }

  #whyChooseUs .server-block img {
    width: 48px;
    height: 48px;
  }

  #whyChooseUs .server-block > p {
    font-size: 20px;
    margin: 30px 0;
  }

  #whyChooseUs .server-block > div {
    color: #ccc;
  }
}

/* 媒体查询（平板） */
@media screen and (min-width: 768px) and (max-width: 996px) {
  #swiper {
    height: 400px;
  }

  #bigData {
    padding: 60px;
  }

  #bigData .bigData-title {
    font-size: 30px;
  }

  #bigData .bigData-device {
    font-size: 30px;
    margin: 30px 0 15px;
  }

  #contactUs {
    height: 300px;
  }

  #contactUs .contactUs-container {
    padding-top: 50px;
  }

  #contactUs .contactUs-container h1 {
    font-size: 30px;
  }

  #contactUs .contactUs-container h3 {
    font-size: 20px;
  }

  #contactUs .contactUs-container button {
    width: 300px;
    height: 50px;
    margin-top: 30px;
  }

  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 15px;
  }

  #customer .customer-title {
    font-size: 24px;
  }

  #whyChooseUs {
    padding: 20px 0;
  }
}
</style>

