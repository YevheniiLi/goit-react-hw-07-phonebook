import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://633adaa8471b8c395576ad6c.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, rejectedWithValue) => {
    try {
      const contacts = await axios.get('/contacts');
      return contacts.data;
    } catch (error) {
      return rejectedWithValue(error);
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContacts',
  async ({ name, number, id }, rejectedWithValue) => {
    try {
      const contacts = await axios.post('/contacts', { name, number, id });
      return contacts.data;
    } catch (error) {
      return rejectedWithValue(error);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (id, rejectedWithValue) => {
    try {
      const contacts = await axios.delete(`/contacts/${id}`);
      return contacts.data;
    } catch (error) {
      return rejectedWithValue(error);
    }
  }
);
