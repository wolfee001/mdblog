import { configureStore } from '@reduxjs/toolkit';
import localSettingsRedux from './localSettingsRedux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authenticationStateRedux from './authenticationStateRedux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, localSettingsRedux);

export const store = configureStore({
  reducer: {
    localSettings: persistedReducer,
    authenticationState: authenticationStateRedux
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
