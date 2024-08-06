<template>
  <div>
    <p>Count: {{ state.count }}</p>
    <p>Name: {{ state.name }}</p>
    <button @click="increment">Increment Count</button>
    <button @click="changeName">Change Name</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  name: 'Vue'
});

const increment = () => {
  state.count++;
};

const changeName = () => {
  state.name = 'Vue 3';
};

</script>
