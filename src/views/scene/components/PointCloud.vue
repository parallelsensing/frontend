<template>
    <div :class="['point-cloud', { 'point-cloud-large': isLarge }]" ref="pointCloud">
        <div class="card-container">
            <div class="title" @click="toggleSize">
                <div class="title-text">
                    <dv-decoration1 style="width:7vw;height:5vh" :color="['#9400D3', '#9400D3']" />
                    <div style="font-size: 1.2vw;">实时点云</div>
                    <dv-decoration1 style="width:7vw;height:5vh;transform: scaleX(-1);" :color="['#9400D3', '#9400D3']" />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 493 46" preserveAspectRatio="none">
                    <defs>
                        <filter id="shadow1" x="-20%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="-1" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.3" />
                        </filter>
                    </defs>
                    <path
                        d="M 3.2798 2.2847 Q 1.34 5.0694 2.5161 8.2527 L 10.12 30.013 Q 12.701 34.935 15.631 36.795 Q 18.622 39.718 27.906 40.025 L 459.956 39.92 Q 469.267 39.521 471.395 37.26 Q 474.854 34.599 476.841 30.024 L 484.484 8.2527 Q 485.66 5.0693 483.72 2.2847 Q 481.78 -0.5 478.387 -0.5 L 8.6133 -0.5 Q 5.2196 -0.5 3.2798 2.2847 Z"
                        stroke="#cdcdcd" fill="#ffffff" filter="url(#shadow1)" />
                </svg>
            </div>
            <div class="content">
                <div class="ros3d-container">
                    <ros3d :width="width" :height="height" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { Decoration1 as DvDecoration1 } from '@kjgl77/datav-vue3';
import ros3d from './ros-3d.vue';

const isLarge = ref(false);
const pointCloud = ref();
const width = ref(800);
const height = ref(500);

const toggleSize = () => {
    isLarge.value = !isLarge.value;
};

const updateDimensions = () => {
   
    if (pointCloud.value) {
        width.value = pointCloud.value.offsetWidth * 0.8;
        height.value = pointCloud.value.offsetHeight * 0.8;
    }
};

onMounted(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
});

watch(isLarge, () => {
    nextTick(() => {
        updateDimensions();
    });
});
</script>

<style scoped lang="scss">
.point-cloud {
    position: absolute;
    width: 28vw;
    height: 30vh;
    top: 10vh;
    right: 30px;
    background-color: #ffffff;
    border-radius: 30px;

    transition: width 0.3s, height 0.3s;
}

.point-cloud-large {
    width: 60vw;
    height: 70vh;
    background-color: #ffffff;

}

.card-container {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 30px;
    box-shadow: 2px 6px 8px 3px rgba(0, 0, 0, 0.15);
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    padding: 5px 0 0 0;
    position: relative;
    top: 0;
    transform: translateY(-35%);
    height: 50px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.title-text {
    display: flex;
    position: absolute;
    z-index: 1;
    font-size: 18px;
    font-weight: 900;
    color: #920783;
}

.title svg {
    width: 100%;
    height: 100%;
    z-index: 0;
}

.content {
    position: relative;
    width: 80%;
    height: 80%;
    justify-content: center;
    align-items: center;
}

.ros3d-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

</style>