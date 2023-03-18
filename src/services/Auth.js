/* eslint-disable no-promise-executor-return */
import axios from 'axios';
import BASEURL from './URL_API';

const options = {
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const login = async (email, password) => {
  const res = await axios.post(`${BASEURL}login`, {
    user: {
      email,
      password,
    },
  }, options);

  const user = res.data;
  user.token = res.headers.authorization;
  return user;
};

const signup = async (name, email, password) => {
  const res = await axios.post(`${BASEURL}signup`, {
    user: {
      name,
      email,
      password,
    },
  }, options);

  const user = res.data;
  user.token = res.headers.authorization;

  return user;
};

const logout = async (authorization) => {
  const logoutOptions = {
    headers: {
      ...options.headers,
      authorization,
    },
  };

  const res = await axios.delete(`${BASEURL}logout`, logoutOptions);

  return res.data;
};

const currentUser = async (userStored) => {
  const authorization = userStored.token;

  const CurrentUserOptions = {
    headers: {
      ...options.headers,
      authorization,
    },
  };
  const answer = await axios.get(`${BASEURL}current_user`, CurrentUserOptions);
  const user = answer.data;

  user.token = authorization;
  return user;
};

const AuthAPI = {
  login,
  logout,
  signup,
  currentUser,
};

export default AuthAPI;
