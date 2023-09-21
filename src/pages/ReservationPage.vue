<template>
  <div class="w-full h-full">
    <div>
      <h1>Reservation Page</h1>
    </div>
    <div class="w-full h-full flex justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <el-button>預約會議室 + </el-button>

        <div>
          <div>已預約時段</div>
          <div>...</div>
        </div>

        <div>
          <div>歷史預約時段</div>
          <div>...</div>
        </div>

        <reservation-schedule />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReservationSchedule from '@/components/reservationPage/ReservationSchedule.vue';
</script>

<style scoped lang="postcss"></style>
