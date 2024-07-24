<template>
    <div v-if="showSidebar" class="sidebar">
        <div class="image-container" v-for="(image, index) in images" :key="index" @click="handleClick(image.alt)">
            <v-tooltip :text="tooltips[image.alt]" :content-class="'custom-tooltip'">
                <template v-slot:activator="{ props }">
                    <div v-bind="props" class="image-box">
                        <img :src="image.src" :alt="image.alt" :class="{ 'selected': activeImage === image.alt }" />
                        <div class="divider-container">
                            <v-divider :thickness="2" class="border-opacity-100 custom-divider" color="#828282"></v-divider>
                        </div>
                    </div>
                </template>
            </v-tooltip>
        </div>
        <v-tooltip location="bottom" text="收起" :content-class="'custom-tooltip0'">
            <template v-slot:activator="{ props }">
                <div v-bind="props" class="closed-icon" @click="handleClickClosed">
                    <svg t="1720764885748" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        p-id="8017" width="128" height="128">
                        <path
                            d="M176 513.7l392.73-395.44a32 32 0 0 0-45.41-45.1L108 491.3a32 32 0 0 0 0.16 45.25L523.48 949a32 32 0 1 0 45.1-45.41z"
                            fill="#920783" p-id="8018" transform="scale(1.2, 1)"></path>
                        <path
                            d="M525.23 513.7L918 118.26a32 32 0 1 0-45.41-45.1L457.27 491.3a32 32 0 0 0 0.16 45.25L872.7 949a32 32 0 0 0 45.1-45.41z"
                            fill="#920783" p-id="8019" transform="scale(1.2, 1)"></path>
                    </svg>
                </div>
            </template>
        </v-tooltip>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const emits = defineEmits(['closeSidebar', 'expandSidebar']);

const images = [
    { src: '/img/1.svg', alt: '/dashboard/databoard/index' },
    { src: '/img/2.svg', alt: '/dashboard/pointscene' },
    { src: '/img/3.svg', alt: '/dashboard/keyframe' },
    { src: '/img/4.svg', alt: '/dashboard/assistant' },
    { src: '/img/5.svg', alt: '/map' }
]

const tooltips: any = {
    '/dashboard/databoard/index': '数据大屏',
    '/dashboard/pointscene': '实时场景',
    '/dashboard/keyframe': '关键统计',
    '/dashboard/assistant': '场景助手',
    '/map': '地图导航'
};

const activeImage = ref<string | null>(null);
const showSidebar = ref(true);
const handleClick = (imageName: string) => {
    activeImage.value = imageName;
    router.push(imageName);
    console.log(imageName);
};

const handleClickClosed = () => {
    showSidebar.value = false;
    emits('closeSidebar');
};

</script>

<style lang="scss">
.sidebar {
    margin: 0 20px 0 0;
    padding: 0 10px 0px 0px;
    width: 100px;
    height: 100%;
    background-color: rgb(255, 255, 255);
    position: relative;
    box-shadow: 4px 15px 8px 2px rgba(0, 0, 0, 0.15);
    border: none;
}

.image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    transition: all 0.2s ease;
    padding: 0 0 0 10px;
}

.image-box {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        width: 50px;
        height: auto;
        cursor: pointer;
    }

    &:hover {
        box-shadow: 0 2px 2px rgb(167, 92, 92);
        border-radius: 5px;
    }

    &:active {
        transform: scale(0.9);
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
}

.divider-container {
    width: 70px;
    margin: 10px 5px 10px 0;
    padding: 5px 0 0 5px;
}

.selected {
    border-radius: 5px;
    background-color: #db8ee86f;
}

.custom-divider {
    border-color: var(--v-success-base) !important;
}

.closed-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;
    margin-left: 16px;
    svg {
        width: 100%;
        height: auto;
    }

    &:hover {
        box-shadow: 0 2px 2px rgb(167, 92, 92);
        border-radius: 5px;
    }

    &:active {
        transform: scale(0.9);
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
}

.custom-tooltip {
    height: 40px !important;
    font-size: 22px !important;
    background-color: #802f75c8 !important;
    color: #ffffff !important;
    border-radius: 4px !important;
}

.custom-tooltip0 {
    height: 40px !important;
    font-size: 18px !important;
    background-color: #802f75c8 !important;
    color: #ffffff !important;
    border-radius: 4px !important;
}
</style>