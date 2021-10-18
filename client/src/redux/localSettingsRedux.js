import { createSlice } from '@reduxjs/toolkit';

const localSettingsSlice = createSlice({
  name: 'localSettings',
  initialState: {
    darkMode: false
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    }
  }
});

export const { setDarkMode } = localSettingsSlice.actions;
export default localSettingsSlice.reducer;
