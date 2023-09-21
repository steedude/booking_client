<template>
  <vue-cal
    hide-view-selector
    hide-arrow-prev
    selected-date="2023-08-25"
    :disable-views="['years', 'year', 'month', 'week']"
    :time-from="9 * 60"
    :time-to="19 * 60"
    :time-step="30"
    :editable-events="{ title: false, drag: true, resize: true, delete: true, create: true }"
    :drag-to-create-threshold="0"
    :min-split-width="200"
    :split-days="teams"
    :sticky-split-labels="true"
    local=""
    class="vuecal--green-theme"
  ></vue-cal>
</template>

<script setup lang="ts">
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const teams = [
  { id: 1, class: 'a', label: 'A' },
  { id: 2, class: 'b', label: 'B' },
  { id: 3, class: 'c', label: 'C' },
  { id: 4, class: 'd', label: 'D' },
  { id: 5, class: 'e', label: 'E' },
  { id: 6, class: 'f', label: 'F' },
];
</script>

<style lang="postcss" scoped>
:deep(.vuecal__cell-split) {
  &.a {
    @apply bg-blue-100;
  }
  &.b {
    @apply bg-pink-100;
  }
  &.c {
    @apply bg-green-100;
  }
  &.d {
    @apply bg-yellow-100;
  }
  &.e {
    @apply bg-orange-100;
  }
  &.f {
    @apply bg-gray-100;
  }
}

:deep(.vuecal__arrow) {
  @apply hidden;
}
</style>
