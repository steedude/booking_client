import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginUserApi, logoutUserApi } from '@/apis/user';
import { LoginPayload } from '@/types/user';
export default defineStore('user', () => {
  const name = ref('');
  const team = ref('');

  function setToken(tokenStr: string) {
    localStorage.setItem('booking_fe_token', tokenStr);
  }

  function getToken() {
    return localStorage.getItem('booking_fe_token');
  }

  async function logoutUser() {
    await logoutUserApi();
    localStorage.removeItem('booking_fe_token');
    name.value = '';
    team.value = '';
  }

  async function loginUser(data: LoginPayload) {
    const res = await loginUserApi(data);
    const { token, user } = res.data;
    setToken(token);
    name.value = user.name;
    team.value = user.team;
  }

  return {
    name,
    team,
    getToken,
    loginUser,
    logoutUser,
  };
});
