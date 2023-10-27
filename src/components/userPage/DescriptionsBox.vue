<template>
  <el-descriptions
    class="w-3/4"
    :column="2"
    border
  >
    <el-descriptions-item
      label="賬號"
      :span="2"
      align="center"
    >
      {{ account }}
    </el-descriptions-item>
    <el-descriptions-item
      label="密碼"
      :span="2"
      align="center"
      >*********
      <!-- <el-button
        type="primary"
        size="small"
        >變更密碼</el-button
      > -->
    </el-descriptions-item>
    <el-descriptions-item
      label="暱稱"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      ><EditBox
        :value="name"
        @save="setNameFunc"
      />
    </el-descriptions-item>
    <el-descriptions-item
      label="組別"
      align="center"
    >
      <EditBox
        v-slot="{ isEditing }"
        :value="team"
        :disabled="Boolean(team)"
        @save="setTeamFunc(teamId)"
        @edit="getTeamOptions"
      >
        <item-selector
          v-model="teamId"
          :options="teamOptions"
          :placeholder="props.team || '尚未設置'"
          :disabled="!isEditing"
        />
      </EditBox>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditBox from '@/components/userPage/EditBox.vue';
import ItemSelector from '@/components/common/ItemSelector.vue';
import { getTeamOptionsApi } from '@/apis/user';
import type { TeamOption } from '@/types/user';

const props = defineProps<{
  account: string;
  name: string;
  team: string;
  setUserInfo: Function;
}>();

const teamId = ref('');
const teamOptions = ref<TeamOption[]>([]);

function setNameFunc(name: string) {
  props.setUserInfo(name);
}

async function getTeamOptions(): Promise<void> {
  if (teamOptions.value.length) return;

  const getTeamOptionsResult = await getTeamOptionsApi();
  const teamOptionsData: TeamOption[] = getTeamOptionsResult.data;
  teamOptions.value = teamOptionsData;
}

function setTeamFunc(team: string) {
  props.setUserInfo(null, team);
}
</script>
<style scoped lang="postcss">
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
</style>
