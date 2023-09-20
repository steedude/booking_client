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
      <span>預約管理</span>
    </el-menu-item>
    <el-menu-item
      index="2"
      :route="{ name: 'user' }"
    >
      <el-icon><setting /></el-icon>
      <span>用戶資料</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { Document, Setting } from '@element-plus/icons-vue';
</script>

<style scoped lang="postcss"></style>
