<template>
  <div class="news-container">
    <div class="news-item" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" v-for="item in newsItems" :key="item.id">
      <div class="image">
        <img :src="item.imageUrl" :alt="item.title">
      </div>
      <div class="content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.abstract }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsContainer',
  data() {
    return {
      newsItems: [
        {
          id: 1,
          imageUrl: 'https://wwwcms.hesaitech.com/uploads/1280_X1280_9_7a8d767a0c.PNG',
          title: 'News Article 1',
          abstract: 'This is the abstract for news article 1.',
          url: 'https://example.com/news1'
        },
        {
          id: 2,
          imageUrl: 'https://wwwcms.hesaitech.com/uploads/1280_X1280_9_7a8d767a0c.PNG',
          title: 'News Article 2',
          abstract: 'This is the abstract for news article 2.',
          url: 'https://example.com/news2'
        },
        {
          id: 3,
          imageUrl: 'https://wwwcms.hesaitech.com/uploads/1280_X1280_9_7a8d767a0c.PNG',
          title: 'News Article 3',
          abstract: 'This is the abstract for news article 3.',
          url: 'https://example.com/news3'
        }
      ]
    }
  },
  methods: {
    handleClick(item) {
      // 处理点击事件，比如跳转到新闻详情页
      window.location.href = item.url;
    },
    handleMouseEnter(event) {
      // 添加放大效果
      event.target.style.transform = 'scale(1.05)';
    },
    handleMouseLeave(event) {
      // 移除放大效果
      event.target.style.transform = 'scale(1)';
    }
  }
}
</script>

<style scoped>
.news-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.news-item {
  width: calc(33.33% - 16px);
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.image {
  height: 500px;
  overflow: hidden;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 16px;
  background-color: #f4f4f4;
  flex-grow: 1;
}

.content h3 {
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
}

.content p {
  margin-bottom: 0;
  font-size: 14px;
  color: #666;
}

@media (max-width: 767px) {
  .news-item {
    width: calc(50% - 12px);
  }
}
</style>
