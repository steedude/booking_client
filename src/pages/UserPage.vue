<template>
  <div class="flex justify-center my-16">
    <img
      :src="userStore.image"
      class="h-32 w-32 rounded-full mx-6"
    />
  </div>
  <div class="flex justify-center">
    <UserDescriptions
      :account="userStore.account"
      :name="userStore.name"
      :team="userStore.team"
      :set-user-info="userStore.setUserInfo"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import UserDescriptions from '@/components/userPage/UserDescriptions.vue';

const userStore = useUserStore();
</script>

<style scoped lang="postcss"></style>
