import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import AuthAPI from '../RoRAPI/Auth';
import { LoginArgs, SignupArgs, AuthResponse } from '../RoRAPI/Auth';
import loadingStatus from '../reduxConst';
import CheckUser from '../RoRAPI/CurrentUser';

// actions CONSTANTS
const ACTION_PREPEND = 'API/Auth';

// AUTH Init State
const initialState = {
  loading: loadingStatus.idle,
  user: {
    userName: '',
    eMail: '',
    token: '',
  },
  alert: { green: Array<string>(), red: Array<string>() },
};

const load = createAsyncThunk(
  `${ACTION_PREPEND}/LOAD`,
  async (token:string) => CheckUser.currentUser(token),
);

const logIn = createAsyncThunk<AuthResponse, LoginArgs>(
  `${ACTION_PREPEND}/LOGIN`,
  async (loginArgs) => AuthAPI.login(loginArgs),
);

const signUp = createAsyncThunk<AuthResponse, SignupArgs>(
  `${ACTION_PREPEND}/SIGNUP`,
  async (signupArgs) => AuthAPI.signup(signupArgs),
);

const logOut = createAsyncThunk(
  `${ACTION_PREPEND}/LOGOUT`,
  async (token:string) => AuthAPI.logout(token),
);

const AuthSlice = createSlice({
  name: ACTION_PREPEND,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // /LOGIN
      .addCase(logIn.pending, (state) => {
        state.loading = loadingStatus.pending;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = loadingStatus.succeeded;
        state.alert.green = ['Login Successfully'];
        state.alert.red = [];

        console.log(action)

        const {
          email, name,
        } = action.payload.user;

        const userData = {
          userName: name,
          eMail: email,
          token: action.payload.token,
        };

        state.user = userData;
      })
      .addCase(logIn.rejected, (state) => {
        state.loading = loadingStatus.failed;
        state.alert.green = [];
        state.alert.red = ['Wrong email or password'];
      })
      // /signUp
      .addCase(signUp.pending, (state) => {
        state.loading = loadingStatus.pending;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = loadingStatus.idle;
        state.user = initialState.user;
        state.alert.green = ['User created Successfully'];
        state.alert.red = [];
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = loadingStatus.failed;
        state.alert.green = [];
        state.alert.red = ['User and email cannot be registered.'];
      })
      // /logout
      .addCase(logOut.pending, () => { })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = loadingStatus.idle;
        state.user = initialState.user;
        state.alert.green = [];
        state.alert.red = [];
      })
      .addCase(logOut.rejected, () => { })
      // /load
      .addCase(load.pending, (state) => {
        state.loading = loadingStatus.pending;
      })
      .addCase(load.fulfilled, (state, action) => {
        state.loading = loadingStatus.succeeded;

        const {
          email, name, role,
        } = action.payload;

        const userData = {
          userName: name,
          eMail: email,
          token: action.payload.token,
          role,
        };

        state.user = userData;
      })
      .addCase(load.rejected, (state) => {
        state.loading = loadingStatus.failed;
      });
  },
});

const { actions, reducer } = AuthSlice;

export {
  actions,
  logIn,
  signUp,
  logOut,
  load,
};

export default reducer;

// AuthReducer
