<template>
  <vue-cal
    hide-view-selector
    :selected-date="currentDay"
    active-view="day"
    :disable-views="['years', 'year', 'month', 'week']"
    :time-from="9 * 60"
    :time-to="19 * 60"
    :time-step="30"
    :snap-to-time="30"
    :editable-events="{ title: false, drag: false, resize: false, delete: true, create: true }"
    :drag-to-create-threshold="0"
    :min-split-width="200"
    :min-event-width="100"
    :split-days="products"
    :sticky-split-labels="true"
    :events="booked"
    :on-event-create="onCreateReservation"
    class="vuecal--green-theme"
    @event-drag-create="onDragCreateReservation"
  ></vue-cal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import VueCal, { type Event } from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useProductStore } from '@/stores';
import type { Reservation } from '@/types/reservation';

interface Props {
  currentDay: Date | string;
  events: Array<Reservation>;
  currentReservation?: Event;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:currentReservation']);
const deleteReservation = ref<() => void>();
const products = computed(() => {
  return useProductStore().products.map(({ _id: id, name }) => {
    return { id, label: name };
  });
});
const booked = computed(() => {
  return props.events.map(event => {
    const { _id: productId } = event.product;

    return {
      start: event.start_time,
      end: event.end_time,
      title: event.team,
      class: 'booked',
      split: productId,
      resizing: false,
    };
  });
});

function onCreateReservation(event: Event, deleteEvent: () => void): Event | null {
  deleteReservation.value?.();
  emit('update:currentReservation', event);
  deleteReservation.value = deleteEvent;
  return event;
}

function onDragCreateReservation(event: Event) {
  const { start, end, split } = event;
  if (start.valueOf() === end.valueOf()) {
    ElMessage({
      message: 'The appointment time cannot be less than 30 minutes',
      type: 'error',
    });
    deleteReservation.value?.();
    return;
  }
  const bookedEvent = booked.value.find(book => book.split === split);

  if (!bookedEvent) return;
  const bookedStart = new Date(bookedEvent.start);
  const bookedEnd = new Date(bookedEvent.end);

  if ((start <= bookedStart && end > bookedStart) || (start < bookedEnd && end >= bookedEnd)) {
    ElMessage({
      message: 'Time period overlap',
      type: 'error',
    });
    deleteReservation.value?.();
  }
}
</script>

<style lang="postcss" scoped>
:deep(.vuecal__cell-split) {
  &:nth-of-type(1) {
    @apply bg-blue-100/50;
  }
  &:nth-of-type(2) {
    @apply bg-pink-100/50;
  }
  &:nth-of-type(3) {
    @apply bg-green-100/50;
  }
  &:nth-of-type(4) {
    @apply bg-yellow-100/50;
  }
  &:nth-of-type(5) {
    @apply bg-orange-100/50;
  }
  &:nth-of-type(6) {
    @apply bg-gray-100/50;
  }
}

:deep(.vuecal__title) {
  @apply text-lg;
}

:deep(.vuecal__event) {
  @apply font-bold bg-[rgba(253,156,66,0.9)] border-2 border-[rgb(233,136,46)] text-white;
  &.booked {
    @apply font-bold bg-[rgba(164,230,210,0.9)] border-2 border-[rgb(144,210,190)] text-[#666];
  }
}

:deep(.vuecal__arrow) {
  @apply hidden;
}
</style>
