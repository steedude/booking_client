export interface User {
  id: string;
  name: string;
  username: string;
  team: string;
}

export interface GoogleAuthPayload {
  credential: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
