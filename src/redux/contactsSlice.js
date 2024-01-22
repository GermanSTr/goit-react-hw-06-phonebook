import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContacts: (state, action) => {},
    deleteContacts: (state, action) => {},
    changeFilter: (state, action) => {},
  },
});

export const { increment, decrement, incrementByAmount } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
