import axios from 'axios';
import BASEURL from './URL_API';
import { AuthResponse } from './Auth';

const DIRECTION = 'current_user';

const options = {
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const currentUser = async (token: string):Promise<AuthResponse> => {
  const authorization = `Bearer ${token}`;

  const CurrentUserOptions = {
    headers: {
      ...options.headers,
      authorization,
    },
  };
  const res = await axios.get(BASEURL + DIRECTION, CurrentUserOptions);

  console.log(res.data);
  

  const authResponse:AuthResponse = {
    status: res.data.status,
    user: res.data.data
  }

  authResponse.user.token = token

  return authResponse;
};

const CheckUser = {
  currentUser,
};

export default CheckUser;
