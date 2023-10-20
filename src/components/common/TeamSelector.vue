<template>
  <el-select
    v-model="team"
    class="w-full"
    filterable
    clearable
    :placeholder="props.placeholder"
    :disabled="props.disabled"
  >
    <el-option
      v-for="teamOption in teamOptions"
      :key="teamOption._id"
      :label="teamOption.name"
      :value="teamOption._id"
    />
  </el-select>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { getTeamOptionsApi } from '@/apis/user';
import type { TeamOption } from '@/types/user';

const props = defineProps<{
  modelValue: string;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
}>();
const emit = defineEmits(['update:modelValue']);

const team = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const teamOptions = ref<TeamOption[]>([]);

async function getTeamOptions(): Promise<void> {
  if (teamOptions.value.length) return;
  const getTeamOptionsResult = await getTeamOptionsApi();
  const teamOptionsData: TeamOption[] = getTeamOptionsResult.data;
  teamOptions.value = teamOptionsData;
}

defineExpose({ getTeamOptions });
</script>
