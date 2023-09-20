<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
    <el-breadcrumb-item>{{ currentRouteTitle }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const router = useRouter();
console.log(router.currentRoute.value);
const currentRouteTitle = computed(() => {
  return router.currentRoute.value.meta.title || '-';
});
</script>

<style scoped lang="postcss"></style>
