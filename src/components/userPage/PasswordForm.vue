<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="20px"
  >
    <div class="mb-2">密碼變更</div>
    <el-form-item
      label="New:"
      prop="password"
    >
      <el-input
        v-model="ruleForm.password"
        type="password"
        style="text-align: center"
    /></el-form-item>
    <el-form-item
      label="Confirm:"
      prop="checkPassword"
    >
      <el-input
        v-model="ruleForm.checkPassword"
        type="password"
        style="text-align: center"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="edit-box-button"
        @click="clickSave(ruleFormRef)"
      >
        {{ 'Save' }}
      </el-button>
      <el-button
        class="edit-box-button"
        @click="clickCancel()"
      >
        {{ 'Cancel' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const emit = defineEmits(['save', 'cancel']);

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  password: '',
  checkPassword: '',
});

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [
    { required: true, message: 'Please input the password', trigger: 'blur' },
    {
      min: 6,
      max: 26,
      message: 'Length should be 6 to 26',
      trigger: 'blur',
    },
  ],
  checkPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
});

function validatePass(_rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
}

function clickSave(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(valid => {
    if (!valid) {
      console.log('error submit!');
      return false;
    }
    emit('save', ruleForm.password);
    return true;
  });
}

function clickCancel() {
  emit('cancel');
}
</script>

<style scoped></style>
