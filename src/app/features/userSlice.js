import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";

const initialState = {
  user: null,
  //   authReady: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state, { payload }) => {},
    // authReadyAct: (state) => {
    //   state.authReady = true;
    // },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
