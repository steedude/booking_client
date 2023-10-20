<template>
  <div class="flex h-full w-full">
    <SideBar />
    <div class="h-full w-full overflow-x-hidden">
      <div class="p-4 flex justify-between">
        <AppBreadcrumb />
        <div
          class="mr-4"
          @click="onClickLogout"
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
import { useUserStore } from '@/stores';
import router from '@/router';
const { logoutUser } = useUserStore();

async function onClickLogout() {
  try {
    await logoutUser();
    await router.push('/auth');
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="postcss"></style>
