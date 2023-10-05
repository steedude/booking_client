<template>
  <el-descriptions
    class="w-1/2"
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
        :value="team"
        @save="setTeamFunc"
      />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import EditBox from '@/components/userPage/EditBox.vue';

const props = defineProps<{
  account: String;
  name: String;
  team: String;
  setUserInfo: Function;
}>();

function setNameFunc(name: String) {
  props.setUserInfo(name);
}

function setTeamFunc(team: String) {
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
