/* eslint-disable import/named */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
}
const initialState: UserState = {
  token: null,
  role: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "userAuth",
  initialState: initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      const token = action.payload.token;
      localStorage.setItem("user-token", token || "");
    },
    logOut: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user-token");
    },
  },
});

export const { loginUser, logOut } = userSlice.actions;

export default userSlice.reducer;
