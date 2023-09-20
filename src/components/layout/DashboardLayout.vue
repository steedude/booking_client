<template>
  <div class="flex h-screen w-screen">
    <SideBar />
    <div class="h-full w-full">
      <div class="p-4 flex justify-between">
        <AppBreadcrumb />
        <div
          class="mr-4"
          @click="router.replace({ name: 'authentication' })"
        >
          登出
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/indexPage/SideBar.vue';
import AppBreadcrumb from '@/components/indexPage/AppBreadcrumb.vue';
import router from '@/router';
</script>

<style scoped lang="postcss"></style>
