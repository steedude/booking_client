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
    :editable-events="{ title: false, drag: false, resize: false, delete: false, create: true }"
    :drag-to-create-threshold="0"
    :min-split-width="200"
    :min-event-width="100"
    :split-days="products"
    :sticky-split-labels="true"
    :events="booked"
    :on-event-create="onCreateReservation"
    class="vuecal--green-theme w-full"
    @event-drag-create="onDragCreateReservation"
  >
    <template #title="{ view }">
      {{ view.startDate.getFullYear() }}-{{ `${view.startDate.getMonth() + 1}`.padStart(2, '0') }}-{{
        `${view.startDate.getDate()}`.padStart(2, '0')
      }}
    </template>

    <template #event="{ event }">
      <div
        v-if="userStore.team && userStore.team === event.title"
        class="absolute right-0 top-0 cursor-pointer hover:text-red-700 hover:scale-125 transition-all"
        @click="deleteBooked(event.content)"
      >
        <el-icon><Close /></el-icon>
      </div>
      <p class="vuecal__event-title">{{ event.title }}</p>
      <div class="vuecal__event-time">
        {{ event.start.formatTime() }}<span>&nbsp;- {{ event.end.formatTime() }}</span>
      </div>
    </template>
  </vue-cal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Close } from '@element-plus/icons-vue';
import VueCal, { type Event } from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useProductStore, useUserStore } from '@/stores';
import { formatTime } from '@/utils/moment';
import { groupBy } from '@/utils/tools';
import { TEAM_EVENT_STYLE } from '@/configs/team';
import type { Reservation } from '@/types/reservation';

interface Props {
  currentDay: Date | string;
  events: Array<Reservation>;
  currentReservation?: Event;
  isLoading?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:currentReservation', 'deleteReservation']);
const deleteReservation = ref<() => void>();
const userStore = useUserStore();
const products = computed(() => {
  return useProductStore().products.map(({ _id: id, name }) => {
    return { id, label: name };
  });
});
const booked = computed(() => {
  const groupedEvents = groupBy(props.events, 'team');

  return Object.keys(groupedEvents)
    .map((team: string, index: number) => {
      return groupedEvents[`${team}`].map(event => {
        const { _id: productId } = event.product;
        const { _id: reservationId } = event;

        return {
          start: formatTime(event.start_time),
          end: formatTime(event.end_time),
          title: event.team,
          class: `booked ${TEAM_EVENT_STYLE[index] ?? 'bg-[rgb(164,230,210)] border-[rgb(144,210,190)]'}`,
          content: reservationId,
          split: productId,
          resizing: false,
        };
      });
    })
    .flat();
});

function onCreateReservation(event: Event, deleteEvent: () => void): Event | null {
  deleteReservation.value?.();
  emit('update:currentReservation', event);
  deleteReservation.value = deleteEvent;
  return event;
}

function onDragCreateReservation(event: Event) {
  const { start, end } = event;

  if (+end.valueOf() - +start.valueOf() < 30 * 60 * 1000) {
    removeReservation('The appointment time cannot be less than 30 minutes');
    return;
  }
  if (start < new Date()) {
    removeReservation('Unable to reserve time in the past');
    return;
  }
  if (isBooked(event)) removeReservation('Time period overlap');
}

function isBooked({ start, end, split }: Event) {
  const bookedEvents = booked.value.filter(book => book.split === split);

  if (!bookedEvents.length) return false;
  return bookedEvents.some(event => {
    const bookedStart = new Date(event.start);
    const bookedEnd = new Date(event.end);

    return (start <= bookedStart && end > bookedStart) || (start < bookedEnd && end >= bookedEnd);
  });
}

function removeReservation(message: string) {
  ElMessage({ message, type: 'error' });
  deleteReservation.value?.();
  emit('update:currentReservation', undefined);
}

function deleteBooked(id: string) {
  if (props.isLoading) return;
  ElMessageBox.confirm('確認要取消此預約時段嗎？', '提示', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
  }).then(() => {
    emit('deleteReservation', id);
  });
}
</script>

<style lang="postcss" scoped>
:deep(.vuecal__cell-split) {
  &:nth-of-type(1n) {
    @apply bg-blue-100/50;
  }
  &:nth-of-type(2n) {
    @apply bg-pink-100/50;
  }
  &:nth-of-type(3n) {
    @apply bg-green-100/50;
  }
  &:nth-of-type(4n) {
    @apply bg-yellow-100/50;
  }
  &:nth-of-type(5n) {
    @apply bg-orange-100/50;
  }
}

:deep(.vuecal__title) {
  @apply text-lg;
}

:deep(.vuecal__event) {
  @apply font-bold bg-[rgba(253,156,66,0.9)] border-2 border-[rgb(233,136,46)] text-white;
  &.booked {
    @apply text-[#666] flex flex-col justify-center items-center opacity-90;
  }
}

:deep(.vuecal__arrow) {
  @apply hidden;
}

:deep(.vuecal__event-title) {
  @apply text-sm text-ellipsis overflow-hidden whitespace-nowrap;
}

:deep(.vuecal__event-time) {
  @apply font-normal text-sm;
}
</style>
