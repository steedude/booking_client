<template>
  <div class="h-full w-full">
    <h1>Skyline 會議室預約系統</h1>
    <div class="flex justify-center items-center py-10">
      <div class="w-full flex flex-col justify-center items-center gap-5 px-10">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="Pick a day"
          :clearable="false"
          :editable="false"
          :disabled-date="disabledDate"
          @change="fetchReservations"
        />
        <reservation-schedule
          v-model:current-reservation="currentReservation"
          :current-day="day"
          :events="reservations"
        />
        <el-button
          type="primary"
          size="large"
          :disabled="isLoading || !currentReservation"
          @click="showConfirmPopup"
          >預約會議室</el-button
        >
        <el-dialog
          v-model="isShowConfirmPopup"
          title="預約會議室"
          width="20%"
          align-center
        >
          <p>會議室： {{ productMap[currentReservation?.split ?? '']?.name }}</p>
          <p>開始時間： {{ formatTime(currentReservation?.start) }}</p>
          <p>結束時間： {{ formatTime(currentReservation?.end) }}</p>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="closeConfirmPopup">關閉</el-button>
              <el-button
                type="primary"
                :loading="isReserving"
                @click="reserveMeetingRoom"
              >
                送出
              </el-button>
            </span>
          </template>
        </el-dialog>
        <user-info-setting-popup
          v-model="isShowUserInfoSettingPopup"
          @set-team-done="showConfirmPopup"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Event } from 'vue-cal';
import { storeToRefs } from 'pinia';
import { useProductStore, useUserStore } from '@/stores';
import ReservationSchedule from '@/components/reservationPage/ReservationSchedule.vue';
import UserInfoSettingPopup from '@/components/reservationPage/UserInfoSettingPopup.vue';
import { fetchReservationsApi, postReservationApi } from '@/apis/reservation';
import { formatTime } from '@/utils/moment';
import type { Reservation } from '@/types/reservation';

const day = ref(formatTime(new Date().setHours(0, 0, 0, 0)));
const reservations = ref<Reservation[]>([]);
const currentReservation = ref<Event>();
const isLoading = ref(false);
const isShowConfirmPopup = ref(false);
const isShowUserInfoSettingPopup = ref(false);
const isReserving = ref(false);
const { productMap } = storeToRefs(useProductStore());
const userStore = useUserStore();

function fetchReservations() {
  isLoading.value = true;
  fetchReservationsApi({ start_time: formatTime(day.value) })
    .then(({ data }) => {
      reservations.value = data.reservations;
      currentReservation.value = undefined;
    })
    .catch(error => {
      ElMessage({
        message: error.message,
        type: 'error',
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
}

async function showConfirmPopup() {
  if (userStore.team !== '') {
    isShowConfirmPopup.value = true;
    return;
  }
  isShowUserInfoSettingPopup.value = true;
}

function closeConfirmPopup() {
  isShowConfirmPopup.value = false;
}

function reserveMeetingRoom() {
  const { start, end, split } = currentReservation.value ?? {};
  const postData = {
    start_time: formatTime(start),
    end_time: formatTime(end),
    product_id: split?.toString() ?? '',
  };

  isReserving.value = true;
  postReservationApi(postData)
    .then(({ message }) => {
      fetchReservations();
      closeConfirmPopup();
      ElMessageBox.alert(message, '提示', {
        confirmButtonText: '確認',
        center: true,
      });
    })
    .catch(error => {
      ElMessage({
        message: error.message,
        type: 'error',
      });
    })
    .finally(() => {
      isReserving.value = false;
    });
}

function disabledDate(date: Date) {
  const now = new Date();

  now.setHours(0, 0, 0, 0);
  return date < now;
}

useProductStore().fetchProducts();
onMounted(fetchReservations);
</script>

<style scoped lang="postcss"></style>
