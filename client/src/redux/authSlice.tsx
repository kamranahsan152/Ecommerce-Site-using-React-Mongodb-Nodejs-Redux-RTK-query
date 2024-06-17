/* eslint-disable import/named */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  authToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
}
const initialState: UserState = {
  authToken: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.authToken = action.payload.authToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      const token = action.payload.authToken;
      localStorage.setItem("auth-token", token || "");
    },
    clearUser: (state) => {
      state.authToken = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth-token");
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const logoutUser = () => (dispatch: any) => {
  dispatch(clearUser());
};

export default authSlice.reducer;
