// Redux ToolKit + createSlice + createAsyncThunk + builder

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

const handleFetch = (state, action) => {
  state.items = action.payload;
};

const handleAdd = (state, action) => {
  state.items.push(action.payload);
};

const handleDelete = (state, action) => {
  const index = state.items.findIndex(item => item.id === action.payload.id);
  state.items.splice(index, 1);
};

const actions = [fetchContacts, addContacts, deleteContacts];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, handleFetch)
      .addCase(addContacts.fulfilled, handleAdd)
      .addCase(deleteContacts.fulfilled, handleDelete)
      .addMatcher(
        isAnyOf(...actions.map(action => action.fulfilled)),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(...actions.map(action => action.pending)), state => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(...actions.map(action => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const { changeFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

// Redux ToolKit + createSlice + createAsyncThunk

// import { createSlice } from '@reduxjs/toolkit';
// import { fetchContacts, addContacts, deleteContacts } from './operations';

// const request = (state) => {
//   state.isLoading = true;
// };

// const success =(state) => {
//   state.isLoading = false;
//   state.error = null;
// }

// const error = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// }

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//     filter: '',
//   },
//   reducers: {
//     changeFilter(state, action) {
//        state.filter = action.payload ;
//     },
//   },
//   extraReducers: {
//     [fetchContacts.pending](state) {
//       request(state);
//     },
//     [fetchContacts.fulfilled](state, action) {
//       state.items = action.payload;
//       success(state, action);
//     },
//     [fetchContacts.rejected](state, action) {
//       error(state, action);
//     },
//     [addContacts.pending](state) {
//       request(state);
//     },
//     [addContacts.fulfilled](state,action) {
//       state.items.push(action.payload);
//       success(state,action)
//     },
//     [addContacts.rejected](state, action) {
//       error(state, action)
//     },
//     [deleteContacts.pending](state) {
//       request(state);
//     },
//     [deleteContacts.fulfilled] (state, action) {
//       const index = state.itmes.findIndex(items => items.id === action.payload);
//       state.items.splice(index,1);
//       success(state,action);
//     },
//     [deleteContacts.rejected] (state, action){
//       error ( state, action)
//     }
//   }
// });

// export const { changeFilter } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;
