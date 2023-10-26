<template>
  <div>
    <el-table
      :data="reservations"
      style="width: 99%"
      max-height="350px"
    >
      <!-- <el-table-column
        prop="_id"
        label="ID"
      ></el-table-column> -->
      <el-table-column
        prop="date"
        label="日期"
      ></el-table-column>
      <el-table-column
        prop="duration"
        label="時間"
      ></el-table-column>
      <el-table-column label="名稱">
        <template #default="scope">
          {{ scope.row.product_id.name }}
        </template>
      </el-table-column>
      <el-table-column label="狀態">
        <template #default="scope">
          <el-text
            v-if="!scope.row.confirmed"
            class="mx-1"
            type="info"
            >尚未確認</el-text
          ><el-text
            v-if="scope.row.confirmed"
            class="mx-1"
            type="success"
            >已確認</el-text
          ></template
        >
      </el-table-column>
      <el-table-column
        v-if="isCancelable"
        label="操作"
      >
        <template #default="scope">
          <el-button
            type="danger"
            @click="cancelReservation(scope.row._id)"
            >取消</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { Reservation } from '@/types/reservation';

defineProps<{
  reservations: Reservation[];
  isCancelable: boolean;
}>();

const emit = defineEmits(['cancel']);

function cancelReservation(id) {
  emit('cancel', id);
}
</script>
