<template>
  <div class="password-edit-area">
    <EditBox
      v-if="!isEditing"
      value="********"
      @edit="toggleEditButton"
    />
    <PasswordForm
      v-if="isEditing"
      @save="changePasswordFunc"
      @cancel="cancelFunc"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { changePasswordApi } from '@/apis/user';
import EditBox from '@/components/userPage/EditBox.vue';
import PasswordForm from '@/components/userPage/PasswordForm.vue';
import { PasswordPayload } from '@/types/user';

const isEditing = ref(false);

function toggleEditButton() {
  isEditing.value = true;
}

async function changePasswordFunc(password: string) {
  const passwordPayload = {} as PasswordPayload;
  passwordPayload.password = password;
  await changePasswordApi(passwordPayload);
  isEditing.value = false;
}

function cancelFunc() {
  isEditing.value = false;
}
</script>

<style scoped>
.password-edit-area {
  display: flex;
  justify-content: center;
}
</style>
