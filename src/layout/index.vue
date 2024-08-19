<template>
    <div class="layout">
        <div class="headerbar">
            <Hearderbar></Hearderbar>
        </div>
        <div class="main-container">
            <div v-if="showSidebar" class="sidebar1">
                <Sidebar @closeSidebar="handleSidebarClosed"></Sidebar>
            </div>
            <div v-else @click="handleClickExpand">
                <img src="/img/展开.svg" alt="Closed Icon" />
            </div>
            <div class="content">
                    <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Hearderbar from "./components/Headerbar.vue";
import Sidebar from "./components/Sidebar.vue";
const showSidebar = ref(true);
const handleSidebarClosed = () => {
    showSidebar.value = false;
};

const handleClickExpand = () => {
    showSidebar.value = true;
};

</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.headerbar {
    width: 100vw;
}

.main-container {
    display: flex;
    height: calc(100vh - 85px);
    width: 100vw;
    flex-grow: 1;
}
.sidebar1 {
    transform: translateY(-15px);
    width: 120px;
    height: calc(100% + 15px);
}
.content {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    margin-right: 25px;
    position: relative;
    overflow: hidden;
}
</style>