/* eslint-disable no-promise-executor-return */
import axios from 'axios';
import BASEURL from './URL_API';

const options = {
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

interface LoginArgs {
  email: string;
  password: string;
}

interface SignupArgs {
  name: string;
  email: string;
  password: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthResponse {
  status: {
    code: number,
    message: string,
  };
  user: UserInfo;
}

const login = async ({email, password}:LoginArgs):Promise<AuthResponse> => {
  const res = await axios.post(`${BASEURL}login`, {
    user: {
      email,
      password,
    },
  }, options);

  const authResponse:AuthResponse = {
    status: res.data.status,
    user: res.data.data
  }

  authResponse.user.token = res.headers.authorization

  return authResponse;
};

const signup = async ({name, email, password}:SignupArgs):Promise<AuthResponse> => {
  const res = await axios.post(`${BASEURL}signup`, {
    user: {
      name,
      email,
      password,
    },
  }, options);

  const authResponse:AuthResponse = {
    status: res.data.status,
    user: res.data.data
  }

  authResponse.user.token = res.headers.authorization

  return authResponse;
};

const logout = async (token:string) => {
  const authorization = `Bearer ${token}`;
  const logoutOptions = {
    headers: {
      ...options.headers,
      authorization,
    },
  };

  const res = await axios.delete(`${BASEURL}logout`, logoutOptions);

  return res.data;
};

const AuthAPI = {
  login,
  logout,
  signup,
};

export default AuthAPI;
export type { LoginArgs, SignupArgs, AuthResponse, UserInfo }
