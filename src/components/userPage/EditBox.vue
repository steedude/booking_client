<template>
  <div class="edit-box">
    <slot
      name="default"
      :is-editing="isEditing"
    >
      <el-input
        v-model="localValue"
        :disabled="!isEditing"
        class="edit-box-input"
      />
    </slot>
    <el-button
      type="primary"
      class="edit-box-button"
      :disabled="Boolean(disabled) && !isEditing"
      @click="toggleEditing"
    >
      {{ isEditing ? 'Save' : 'Edit' }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['save', 'edit']);
const props = defineProps<{
  value: string;
  disabled?: boolean | undefined;
}>();

const isEditing = ref(false);
const localValue = ref(props.value);

function toggleEditing() {
  if (isEditing.value) {
    emit('save', localValue.value);
  } else {
    emit('edit');
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
