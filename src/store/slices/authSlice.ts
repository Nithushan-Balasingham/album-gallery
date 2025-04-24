import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  username: string | null;
  id:string | null
}

const initialState: AuthState = {
  accessToken: null,
  username: null,
  id: null

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<{ username: string; id: string }>) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken, setUser } = authSlice.actions;

export default authSlice.reducer;
