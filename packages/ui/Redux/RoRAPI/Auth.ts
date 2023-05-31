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

interface AuthResponse {
  token: string;
  status: {
    code: number,
    message: string,
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const login = async ({email, password}:LoginArgs):Promise<AuthResponse> => {
  const res = await axios.post(`${BASEURL}login`, {
    user: {
      email,
      password,
    },
  }, options);

  const authResponse:AuthResponse = {
    token: res.headers.authorization,
    status: res.data.status,
    user: res.data.data
  }
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
    token: res.headers.authorization,
    status: res.data.status,
    user: res.data.data
  }
  return authResponse;
};

const logout = async (authorization:string) => {
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
export type { LoginArgs, SignupArgs, AuthResponse }
