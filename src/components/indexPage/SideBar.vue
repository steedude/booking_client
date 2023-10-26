<template>
  <el-menu
    default-active="1"
    router
  >
    <el-menu-item
      index="1"
      :route="{ name: 'reservation' }"
    >
      <el-icon><document /></el-icon>
      <span>新增預約</span>
    </el-menu-item>
    <el-menu-item
      index="2"
      :route="{ name: 'history' }"
    >
      <el-icon><Edit /></el-icon>
      <span>管理預約</span>
    </el-menu-item>
    <el-menu-item
      index="3"
      :route="{ name: 'user' }"
    >
      <el-icon><Avatar /></el-icon>
      <span>用戶資料</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { Document, Edit, Avatar } from '@element-plus/icons-vue';
</script>

<style scoped lang="postcss"></style>
