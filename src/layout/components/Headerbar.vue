<template>
    <!-- 顶部导航栏 -->
    <div class="navbar">
        <div class="navbar-left">
            <img src="/img/logo.png" alt="" class="logo">
            <h1 class="company-name">北京中科智传科技有限公司</h1>
        </div>
        <div class="navbar-right">
            <v-btn @click="toggle" variant="text" class="fullscreen-btn">
                <img src="/img/全屏图标.png" alt="全屏">
            </v-btn>
            <v-btn variant="text" class="fullscreen-btn">
                <img src="/img/中英图标.png" alt="中英">
            </v-btn>

            <el-divider direction="vertical" class="divider" />
            <span class="user-info">
                <span>
                    <h1 class="greeting">
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
import useUserStore from '@/stores/users/modules/user';
const userStore = useUserStore();
const { isFullscreen, toggle } = useFullscreen();
const name = userStore.username;

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

$navbar-height: 60px;
$navbar-padding: 20px;
$navbar-bg-color: #fff;
$navbar-box-shadow: 0px 4px 10px 2px rgba(78, 78, 78, 0.2);
$font-color-primary: #660874;
$font-weight-bold: 600;
$font-size-large: 1.6vw;
$font-size-medium: 1.3vw;
$avatar-margin: 20px;

.navbar {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $navbar-height;
    background-color: $navbar-bg-color;
    padding: 0 $navbar-padding;
    z-index: 99999999999;
    box-shadow: $navbar-box-shadow;

    .navbar-left {
        display: flex;
        align-items: center;

        .logo {
            height: 40px;
            margin-left: 10px;
        }

        .company-name {
            color: $font-color-primary;
            font-weight: $font-weight-bold;
            font-size: $font-size-large;
            margin-left: 20px;
        }
    }

    .navbar-right {
        display: flex;
        align-items: center;

        .divider {
            margin: 0;
            height: $navbar-height - 12px;
        }

        .user-info {
            display: flex;
            align-items: center;
            margin-left: $avatar-margin;

            .greeting {
                color: $font-color-primary;
                font-weight: $font-weight-bold;
                font-size: $font-size-medium;
            }

            .avatar {
                margin-left: 10px; 
                margin-right: $avatar-margin;
            }
        }

        .fullscreen-btn {
            background: none;
            margin-right: 15px;
            border: none;
            padding: 0;
            cursor: pointer;
            width: 56px;
            height: $navbar-height;

            img {
                width: 56px; 
                height: 56px;
            }
        }
    }
}
</style>
