import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice';
import basketReducer from './features/basketSlice';
import restrauntReducer from './features/restrauntSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restraunt: restrauntReducer,
    auth: authSlice
  },
})