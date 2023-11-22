import request from '@/utils/request';
import type { LoginPayload, GoogleAuthPayload, UserInfoPayload, PasswordPayload } from '@/types/user';

export function loginUserApi(data: LoginPayload) {
  return request.post('/login', data);
}

export function logoutUserApi() {
  return request.post('/logout');
}

export function googleAuthApi(data: GoogleAuthPayload) {
  return request.post('/googleAuth', data);
}

export function registerUserApi(data: LoginPayload) {
  return request.post('/register', data);
}

export function getUserInfoApi() {
  return request.get('/user');
}

export function setUserInfoApi(data: UserInfoPayload) {
  return request.post('/userSetting', data);
}

export function getTeamOptionsApi() {
  return request.get('/teams');
}

export function changePasswordApi(data: PasswordPayload) {
  return request.post('/password', data);
}
