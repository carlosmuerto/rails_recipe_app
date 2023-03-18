import { configureStore } from '@reduxjs/toolkit';
import Auth from './Auth/AuthSlice';

const store = configureStore({
  reducer: {
    Auth: Auth,
  },
});

export default store;
