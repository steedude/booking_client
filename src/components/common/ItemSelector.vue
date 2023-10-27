<template>
  <el-select
    :model-value="props.modelValue"
    class="w-full"
    filterable
    clearable
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    @change="$emit('update:modelValue', $event)"
  >
    <el-option
      v-for="option in props.options"
      :key="option._id"
      :label="option.name"
      :value="option._id"
    />
  </el-select>
</template>
<script lang="ts" setup>
interface option {
  _id: string;
  name: string;
}

interface Props {
  modelValue: string;
  options: option[];
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
});
</script>
