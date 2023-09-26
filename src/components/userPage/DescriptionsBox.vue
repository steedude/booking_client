<template>
  <el-descriptions
    :column="2"
    border
  >
    <el-descriptions-item
      label="賬號"
      column="2"
      :span="2"
      align="center"
    >
      {{ account }}
    </el-descriptions-item>
    <el-descriptions-item
      label="暱稱"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="150px"
      >{{ name }}<el-button size="small">Edit</el-button></el-descriptions-item
    >
    <el-descriptions-item
      label="Team"
      align="center"
      >{{ team }}</el-descriptions-item
    >
    <el-descriptions-item
      label="Password"
      align="center"
      >*********
      <el-button size="small">Edit</el-button>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup lang="ts">
defineProps<{
  account: String;
  name: String;
  team: String;
}>();
</script>
<style scoped lang="postcss">
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
</style>
