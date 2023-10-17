<template>
  <el-dialog
    v-model="showUserInfoSettingPopup"
    title="組別尚未設置，置組別繼續完成預約。"
    align-center
  >
    <el-form
      ref="userFormRef"
      :model="userForm"
      class="w-96"
    >
      <el-form-item
        label="組別"
        :rules="teamRules"
        prop="teamName"
        label-width="100px"
      >
        <el-input
          v-model="userForm.teamName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="暱稱"
        label-width="100px"
      >
        <el-input
          v-model="userForm.userName"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showUserInfoSettingPopup = false">取消</el-button>
        <el-button
          type="primary"
          @click="setTeam(userFormRef)"
          >設置</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { useUserStore } from '@/stores';
import type { FormInstance } from 'element-plus';

const userStore = useUserStore();

const userFormRef = ref<FormInstance>();
const userForm = reactive({
  userName: userStore.name,
  teamName: '',
});

const teamRules = [{ required: true, message: '組別為必填欄位' }];

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'setTeamDone']);

const showUserInfoSettingPopup = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

function setTeam(userFormInstance: FormInstance | undefined) {
  if (!userFormInstance) return;
  userFormInstance.validate(async valid => {
    if (!valid) return;
    const userName = userForm.userName === '' || userForm.userName === userStore.name ? null : userForm.userName;
    await userStore.setUserInfo(userName, userForm.teamName);
    showUserInfoSettingPopup.value = false;
    emit('setTeamDone');
  });
}
</script>
