<template>
    <!-- 顶部导航栏 -->
    <div class="navbar">
        <div class="navbar-left">
            <img src="/img/logo.png" alt="" style="height: 40px;margin-left: 10px;">
            <h1 style="color: #660874;font-weight: 600;font-size: 1.6vw;margin-left: 20px;">北京中科智传科技有限公司</h1>
        </div>
        <div class="navbar-right" style="display: flex;">
            <v-btn @click="toggle" variant="text" class="fullscreen-btn">
                <img src="/img/全屏图标.png" alt="全屏">
            </v-btn>
            <v-btn variant="text" class="fullscreen-btn">
                <img src="/img/中英图标.png" alt="中英">
            </v-btn>

            <el-divider direction="vertical" style="margin:0;height:48px" />
            <span class="user-info">
                <span>
                    <h1 style="color: #660874;font-weight: 600;font-size: 1.3vw;">
                        {{ 'Hi~' + name }}
                    </h1>
                </span>
                <!-- 头像下拉菜单 -->
                <el-dropdown>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="handleSettings">设置</el-dropdown-item>
                            <el-dropdown-item @click="handleLogout">注销</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    <v-avatar class="avatar" x-large image="/img/zky.jpg"></v-avatar>
                </el-dropdown>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();
// const name = localStorage.getItem('username')
const name = '管理员'

const handleSettings = () => {
    console.log('打开设置页面');
}

const handleLogout = () => {
    console.log('用户已注销');
    localStorage.clear();
    window.location.href = "/";
}
</script>

<style lang="scss" scoped>
.navbar {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 修改此处 */
    height: 60px;
    background-color: #fff;
    padding: 0 20px;
    z-index: 99999999999;
    box-shadow: 0px 4px 10px 2px rgba(78, 78, 78, 0.2);

    .navbar-left {
        display: flex;
        align-items: center;
    }

    .navbar-right {
        display: flex;
        align-items: center;
    }

    .divider-container {
        display: flex;
        align-items: end;
        margin-right: 0px; // 调整此处以控制divider和用户信息之间的距离
    }

    .user-info {
        display: flex;
        align-items: center;
        margin-left: 20px;

        span {
            margin-right: 10px; // 调整此处以控制文字和头像之间的距离
        }
    }

    .avatar {
        margin-left: 10px; // 调整此处以控制divider和头像之间的距离
        margin-right: 20px;
    }

    .custom-divider {
        border-color: var(--v-success-base) !important;
    }

    .fullscreen-btn {
        background: none;
        margin-right: 15px;
        border: none;
        padding: 0;
        cursor: pointer;
        width: 56px;
        height: 60px;

        img {
            width: 56px; // 你可以根据需要调整宽度
            height: 56px; // 你可以根据需要调整高度
        }
    }
}
</style>