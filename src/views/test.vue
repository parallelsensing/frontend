<template>
  <div style="width:300px;height: 600px;margin-left: 100px;overflow: auto;">
    <v-list lines="one">
      <v-list-item v-for="item in items" :key="item.id" @click="handleClick(item)">
        <div style="display:flex;border-radius: 5px;border: 1px solid;height: 80px; ;">
          <div style="flex: 1;padding:5px;">
            <v-img :src="item.image" />
          </div>

          <div style="flex: 3;background-color:#AB8A9E  ;">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

interface ListItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const items = ref<ListItem[]>([
  { id: 1, title: 'Item 1', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/1.png' },
  { id: 2, title: 'Item 2', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/2.png' },
  { id: 3, title: 'Item 3', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/3.png' },
  { id: 4, title: 'Item 4', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/5.png' },
  { id: 1, title: 'Item 1', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/1.png' },
  { id: 2, title: 'Item 2', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/2.png' },
  { id: 3, title: 'Item 3', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/3.png' },
  { id: 1, title: 'Item 1', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/1.png' },
  { id: 2, title: 'Item 2', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/2.png' },
  { id: 3, title: 'Item 3', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/3.png' },
  { id: 1, title: 'Item 1', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/1.png' },
  { id: 2, title: 'Item 2', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/2.png' },
  { id: 3, title: 'Item 3', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/3.png' },
  { id: 1, title: 'Item 1', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/1.png' },
  { id: 2, title: 'Item 2', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/2.png' },
  { id: 3, title: 'Item 3', subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit', image: '/public/img/3.png' },

]);

const handleClick = (item: ListItem) => {
  alert(`You clicked on ${item.title}`);
};
</script>

<style>
/* 可以在这里添加自定义样式 */
</style>