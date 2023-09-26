import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginUserApi, logoutUserApi, googleAuthApi } from '@/apis/user';
import { registerUserApi } from '@/apis/user';
import { LoginPayload, GoogleAuthPayload } from '@/types/user';
export default defineStore('user', () => {
  const account = ref('');
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
    account.value = '';
    team.value = '';
    name.value = '';
  }

  async function loginUserByGoogle(data: GoogleAuthPayload) {
    const res = await googleAuthApi(data);
    const { token, user } = res.data;
    setToken(token);
    account.value = user.account;
    team.value = user.team;
    name.value = user.name;
  }

  async function loginUser(data: LoginPayload) {
    const res = await loginUserApi(data);
    const { token, user } = res.data;
    setToken(token);
    account.value = user.account;
    team.value = user.team;
    name.value = user.name;
  }

  async function registerUser(data: LoginPayload) {
    const res = await registerUserApi(data);
    const { token, user } = res.data;
    setToken(token);
    account.value = user.account;
    team.value = user.team;
    name.value = user.name;
  }

  return {
    account,
    team,
    name,
    getToken,
    loginUser,
    logoutUser,
    loginUserByGoogle,
    registerUser,
  };
});
