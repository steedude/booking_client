import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginUserApi, logoutUserApi, googleAuthApi } from '@/apis/user';
import { registerUserApi, setUserInfoApi } from '@/apis/user';
import { LoginPayload, GoogleAuthPayload, UserInfoPayload } from '@/types/user';
import { User } from '@/types/user';

const DEFAULT_IMAGE = 'https://randomuser.me/api/portraits/lego/0.jpg';
const DEFAULT_TEAM = '未設定';

export default defineStore(
  'user',
  () => {
    const account = ref('');
    const name = ref('');
    const team = ref('');
    const image = ref('');

    function setToken(tokenStr: string) {
      localStorage.setItem('booking_fe_token', tokenStr);
    }

    function getToken() {
      return localStorage.getItem('booking_fe_token');
    }

    function setUserValueByData(serverUserData: User) {
      account.value = serverUserData.account;
      team.value = serverUserData.team || DEFAULT_TEAM;
      name.value = serverUserData.name;
      image.value = serverUserData.image || DEFAULT_IMAGE;
    }

    async function setUserInfo(nameStr: string | null, teamStr: string | null) {
      const userInfo = {} as UserInfoPayload;
      if (nameStr) userInfo.name = nameStr;
      if (teamStr) userInfo.team = teamStr;
      const res = await setUserInfoApi(userInfo);
      const { user } = res.data;
      setUserValueByData(user);
    }

    async function logoutUser() {
      await logoutUserApi();
      localStorage.removeItem('booking_fe_token');
      account.value = '';
      team.value = '';
      name.value = '';
      image.value = DEFAULT_IMAGE;
    }

    async function loginUserByGoogle(data: GoogleAuthPayload) {
      const res = await googleAuthApi(data);
      const { token, user } = res.data;
      setToken(token);
      setUserValueByData(user);
    }

    async function loginUser(data: LoginPayload) {
      const res = await loginUserApi(data);
      const { token, user } = res.data;
      setToken(token);
      setUserValueByData(user);
    }

    async function registerUser(data: LoginPayload) {
      const res = await registerUserApi(data);
      const { token, user } = res.data;
      setToken(token);
      setUserValueByData(user);
    }

    return {
      account,
      team,
      name,
      image,
      getToken,
      loginUser,
      logoutUser,
      loginUserByGoogle,
      registerUser,
      setUserInfo,
    };
  },
  {
    persist: true,
  },
);
