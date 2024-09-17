import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, username: null, roles: [] },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, username } = action.payload;
      state.token = accessToken;
      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      state.username = decodedToken.UserInfo.username;
      state.roles = decodedToken.UserInfo.roles || [];
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
