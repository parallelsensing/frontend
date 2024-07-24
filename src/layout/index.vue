<template>
    <div class="layout">
        <div class="headerbar">
            <Hearderbar></Hearderbar>
        </div>
        <div class="main-container">
            <div v-if="showSidebar" class="sidebar">
                <Sidebar @closeSidebar="handleSidebarClosed" @expandSidebar="handleSidebarExpanded"></Sidebar>
            </div>
            <div v-else @click="handleClickExpand">
                <svg t="1721117695209" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="3127" width="22" height="36">
                    <path
                        d="M652.8 512z m119.466667 42.666667L332.8 1006.933333c-21.333333 21.333333-59.733333 21.333333-81.066667 0s-21.333333-59.733333 0-81.066666L652.8 512 251.733333 98.133333C230.4 76.8 230.4 38.4 251.733333 17.066667s59.733333-21.333333 81.066667 0L772.266667 469.333333c12.8 12.8 17.066667 25.6 17.066666 42.666667 0 12.8-4.266667 29.866667-17.066666 42.666667z"
                        fill="#920783" p-id="3128"></path>
                </svg>
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

const handleSidebarExpanded = () => {
    showSidebar.value = true;
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
    background-color: #f8f9fa;
    /* 你可以根据需要更改背景颜色 */
}

.main-container {
    display: flex;
    height: calc(100vh - 85px);
    width: 100vw;
    flex-grow: 1;
}

.sidebar {
    transform: translateY(-13px);
    width: 80px;
    height: calc(100% + 13px);
}

.content {
    width: calc(100vw - 80px);
    height: 100%;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
}

</style>