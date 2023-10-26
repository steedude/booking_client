<template>
  <div class="text-2xl">已預約時段</div>
  <ReservationList
    :reservations="reservations"
    :is-cancelable="true"
    @cancel="cancelReservationFunc"
  />
  <br />
  <div class="text-2xl">歷史預約記錄</div>
  <ReservationList
    :reservations="historyReservations"
    :is-cancelable="false"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { formatTime } from '@/utils/moment';
import { fetchFutureReservationsApi, fetchHistoryReservationsApi, deleteReservationsApi } from '@/apis/reservation';
import ReservationList from '@/components/historyPage/ReservationList.vue';
import type { Reservation } from '@/types/reservation';

const reservations = ref<Reservation[]>([]);
const historyReservations = ref<Reservation[]>([]);

async function getReservations(
  fetchFunction: () => Promise<{ data: { reservations: Reservation[] } }>,
): Promise<Reservation[]> {
  const { data } = await fetchFunction();
  return data.reservations.map(reservation => ({
    ...reservation,
    date: formatTime(reservation.start_time, 'YYYY-MM-DD'),
    duration: formatTime(reservation.start_time, 'HH:mm') + '~' + formatTime(reservation.end_time, 'HH:mm'),
  }));
}

async function getAllReservations() {
  reservations.value = await getReservations(fetchFutureReservationsApi);
  historyReservations.value = await getReservations(fetchHistoryReservationsApi);
}

async function cancelReservationFunc(reservationId: string) {
  await deleteReservationsApi(reservationId);
  await getAllReservations();
}

onMounted(getAllReservations);
</script>

<style scoped lang="postcss"></style>
