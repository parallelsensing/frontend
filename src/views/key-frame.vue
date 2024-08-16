<template>
    <div class="key-frame">
        <!-- 头部标题 -->
        <headersall />

        <!-- 总览卡片 -->
        <div class="card-overview">
            <div class="card-overview-first"></div>
            <div class="card-overview-second"></div>
            <div class="card-overview-third"></div>
            <div class="card-overview-fourth"></div>
        </div>

        <!-- 信息列表主体 -->
        <div class="table-list-container">
            <!-- 全选/删除   按钮 -->
            <div class="table-button">
                <div class="table-button-item">
                    <v-checkbox v-model="allSelected" color="purple" class="custom-checkbox-btn" label="全选"
                        :style="{ color: '#920783' }" />
                </div>
                <div class="table-button-item">
                    <v-btn size="large" density="compact" variant="text" color="#920783" @click="deleteSelectedItems">
                        <v-icon style="font-size: 1.3rem;">mdi-trash-can-outline</v-icon>
                        删除
                    </v-btn>
                </div>
            </div>

            <!-- 列表 -->
            <div class="table-list">
                <v-list lines="one" class="v-list">
                    <v-list-item v-for="(item, index) in items" :key="item.id" @mouseover="hoveredIndex = index"
                        @mouseleave="hoveredIndex = null" @click="selectItem(index)">
                        <div class="table-list-item"
                            :class="{ 'hovered': hoveredIndex === index, 'selected': selectedIndex === index }">
                            <div class="v-checkbox-continer">
                                <v-checkbox v-model="selectedItems[index]" color="purple" class="v-checkbox" />
                            </div>

                            <div class="small-img" @click="overlay(item.image)">
                                <img :src="item.image" />
                            </div>

                            <div class="attribution">{{ item.type }}</div>
                            <div class="attribution">{{ item.coordinates }}</div>
                            <div class="attribution">{{ item.time }}</div>
                            <div class="attribution">{{ item.status }}</div>
                            <div class="attribution">{{ item.agent }}</div>
                            <div class="attribution">{{ item.suggestion }}</div>
                            <div class="attribution">{{ item.remark }}</div>
                        </div>
                    </v-list-item>
                </v-list>
            </div>
        </div>
        <!-- 叠加层查看大图 -->
        <v-overlay v-model="showOverlay" class="v-overlay">
            <img :src="imageUrl" style="max-width: 80vw;min-width: 40vw;min-height: 40vh;max-height: 80vh;"
                @click="showOverlay = false">
        </v-overlay>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import headersall from "./header-all.vue";

const showOverlay = ref(false);
const imageUrl = ref();
// 模拟数据
const items = ref([
    { id: 1, image: "/img/loading.png", type: '业务', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '未处理', agent: "场景1", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 2, image: "/img/a.png", type: '事故', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '处理中', agent: "场景2", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 3, image: "/img/d.png", type: '警告', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景3", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 4, image: "/img/c.png", type: '通知', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景1", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 5, image: "/img/CASIA.jpg", type: '通知', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景3", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 6, image: "/img/ar.png", type: '通知', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景1", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 7, image: "/img/b.png", type: '通知', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景1", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 8, image: "/img/zky.jpg", type: '警告', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景3", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 9, image: "/img/密码.png", type: '通知', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景1", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
    { id: 10, image: "/img/logo.png", type: '警告', coordinates: 'xxxxx', time: '2023-04-15 16:27:58', status: '已完成', agent: "场景3", suggestion: 'xxxxxxx', remark: '备注xxxxx' },
]);

// 选中项状态
const selectedItems = ref(items.value.map(() => false));

// 删除选中项
const deleteSelectedItems = () => {
    const remainingItems = items.value.filter((item, index) => !selectedItems.value[index]);
    items.value = remainingItems;
    selectedItems.value = selectedItems.value.filter(selected => !selected);
};

// 全选功能
const allSelected = computed({
    get() {
        if (items.value.length === 0) {
            return false;
        }
        return selectedItems.value.length > 0 && selectedItems.value.every(selected => selected);
    },
    set(value) {
        selectedItems.value = selectedItems.value.map(() => value);
    }
});

// 鼠标悬停效果
const hoveredIndex = ref<number | null>(null);

// 选中效果
const selectedIndex = ref<number | null>(null);
const selectItem = (index: number) => {
    selectedIndex.value = index;
};

// 查看大图
const overlay = (imgUrl: any) => {
    showOverlay.value = true;
    imageUrl.value = imgUrl;
}
</script>

<style scoped lang="scss">
@import "@/styles/key-frame.scss";
</style>