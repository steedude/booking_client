<template>
  <el-dialog
    v-model="showUserInfoSettingPopup"
    class="max-w-fit"
    title="組別尚未設置，設置組別繼續完成預約。"
    align-center
    center
    @open="getTeamOptions"
  >
    <el-form
      ref="userFormRef"
      :model="userForm"
    >
      <el-form-item
        label="組別"
        :rules="teamRules"
        prop="team"
        label-width="60px"
      >
        <team-selector
          ref="teamSelectorElement"
          v-model="userForm.team"
          placeholder="尚未設置"
        />
      </el-form-item>
      <el-form-item
        label="暱稱"
        label-width="60px"
      >
        <el-input
          v-model="userForm.name"
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
import TeamSelector from '@/components/common/TeamSelector.vue';
import type { FormInstance } from 'element-plus';

const userStore = useUserStore();

const teamSelectorElement = ref();
const userFormRef = ref<FormInstance>();
const userForm = reactive({
  name: userStore.name,
  team: '',
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

function getTeamOptions() {
  teamSelectorElement.value.getTeamOptions();
}

function setTeam(userFormInstance: FormInstance | undefined) {
  if (!userFormInstance) return;
  userFormInstance.validate(async valid => {
    if (!valid) return;
    const name = userForm.name === '' || userForm.name === userStore.name ? null : userForm.name;
    await userStore.setUserInfo(name, userForm.team);
    showUserInfoSettingPopup.value = false;
    emit('setTeamDone');
  });
}
</script>
