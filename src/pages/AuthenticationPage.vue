<template>
  <div class="flex flex-col justify-center items-center">
    <div class="my-10 text-4xl">Reservation</div>

    <el-tabs type="border-card">
      <el-tab-pane label="Login"
        ><AuthForm
          is-login
          @login="onLogin"
      /></el-tab-pane>
      <el-tab-pane label="Register"><AuthForm @register="onRegister" /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElNotification } from 'element-plus';
import AuthForm from '@/components/authPage/AuthForm.vue';
import { useUserStore } from '@/stores';
const { loginUser } = useUserStore();
import { LoginPayload } from '@/types/user';
import router from '@/router';
async function onLogin(formData: LoginPayload) {
  try {
    await loginUser(formData);
    await router.push('/');
  } catch (error) {
    console.log(error?.response);

    ElNotification({
      title: 'Title',
      message: 'This is a reminder',
    });

    ElMessage.error({
      customClass: 'absolute bg-white text-black',
      message: error?.response.data.errorMessage,
      type: 'error',
      duration: 50000,
      center: true,
      appendTo: '#app',
    });
  }
}

function onRegister(formData: LoginPayload) {
  loginUser(formData);
}
</script>

<style scoped lang="postcss"></style>
