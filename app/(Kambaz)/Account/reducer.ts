// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   currentUser: null,
// };
// const accountSlice = createSlice({
//   name: "account",
//   initialState,
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//   },
// });
// export const { setCurrentUser } = accountSlice.actions;
// export default accountSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  TotalActivity?: string;
  lastActivity?: string;
  section?: string;
  _id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  loginId?: string;
  email?: string;
  dob?: string;
};


interface AccountState {
  currentUser: User | null;
}

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  
  logout: (state) => {
      state.currentUser = null;
    },
}
});

export const { setCurrentUser,logout } = accountSlice.actions;
export default accountSlice.reducer;