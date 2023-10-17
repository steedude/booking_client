<template>
  <div class="edit-box">
    <el-input
      v-if="!isEditing"
      :value="value"
      disabled
      class="edit-box-input"
    ></el-input>
    <el-input
      v-else
      v-model="localValue"
      class="edit-box-input"
    ></el-input>
    <el-button
      type="primary"
      class="edit-box-button"
      @click="toggleEditing"
    >
      {{ isEditing ? 'Save' : 'Edit' }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['save']);
defineProps<{
  value: String;
}>();

const isEditing = ref(false);
const localValue = ref('');

function toggleEditing() {
  if (isEditing.value) {
    emit('save', localValue.value);
  }
  isEditing.value = !isEditing.value;
}
</script>

<style scoped>
.edit-box {
  display: flex;
  align-items: center;
  padding: 8px;
}

/* Edit box input style */
.edit-box-input {
  flex: 1; /* Automatically expand to fill remaining space */
}

/* Edit button style */
.edit-box-button {
  margin-left: 10px;
}
</style>
