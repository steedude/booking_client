export interface User {
  id: string;
  name: string;
  account: string;
  team: string;
}

export interface GoogleAuthPayload {
  credential: string;
}

export interface LoginPayload {
  account: string;
  password: string;
}
