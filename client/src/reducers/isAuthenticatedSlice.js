import { createSlice } from "@reduxjs/toolkit";

const isAuthenticatedSlice = createSlice({
  name: "isAuthenticated",
  initialState: {
    isAuthenticated: false,
    userInfor: {},
  },
  reducers: {
    logIn: (state, action) => {
      state.isAuthenticated = true;
      for (const i in action.payload) {
        state.userInfor[i] = action.payload[i];
      }
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.userInfor = {};
    },
  },
});

export const { logIn, logOut } = isAuthenticatedSlice.actions;

export default isAuthenticatedSlice.reducer