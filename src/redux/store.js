import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from 'redux/reducer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
