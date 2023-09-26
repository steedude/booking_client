<template>
  <div class="w-full h-full">
    <div>
      <h1>User Page</h1>
    </div>
    <div class="w-full h-full flex justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <DescriptionBox
          ref="descriptionBox"
          :account="userStore.account"
          :name="userStore.name"
          :team="userStore.team"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import DescriptionBox from '@/components/userPage/DescriptionsBox.vue';

const userStore = useUserStore();
</script>

<style scoped lang="postcss"></style>
