import { createSlice } from "@reduxjs/toolkit";


export const setPdv = (pdvData) => {
  return {
    type: 'auth/setPdv',
    payload: pdvData,
  };
};

const initialState = {
  pdv: null,
  token: null,
};
 
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.pdv = action.payload.pdv;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.pdv = null;
      state.token = null;
    },
    setPdv: (state, action) => {
      state.pdv = action.payload;
    },
   
  },
});

export const { setLogin, setLogout} =
  authSlice.actions;
export default authSlice.reducer;

