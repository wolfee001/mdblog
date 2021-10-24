import { createSlice } from '@reduxjs/toolkit';

const localSettingsSlice = createSlice({
  name: 'localSettings',
  initialState: {
    darkMode: false,
    user: {
      currentUser: null
    }
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    clearUser: (state, _) => {
      state.user = {
        currentUser: null
      };
    },
    loginSuccess: (state, action) => {
      state.user.currentUser = action.payload;
    }
  }
});

export const { setDarkMode, clearUser, loginSuccess, loginFailure } = localSettingsSlice.actions;
export default localSettingsSlice.reducer;
