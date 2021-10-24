import { createSlice } from '@reduxjs/toolkit';

const authenticationStateSlice = createSlice({
  name: 'authenticationState',
  initialState: {
    fetching: false,
    error: false
  },
  reducers: {
    clearAuthState: (state, _) => {
      state = {
        fetching: false,
        error: false
      };
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { clearAuthState, setFetching, setError } = authenticationStateSlice.actions;
export default authenticationStateSlice.reducer;
