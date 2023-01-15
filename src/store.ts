import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import noteReducer from './slices/noteSlice';
import sideTreeReducer from './slices/sideTreeSlice';
import userReducer from './slices/userSlice';

export const rootReducer = combineReducers({
  notes: noteReducer,
  sideTree: sideTreeReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['user', 'notes'], // blacklisting a store attribute name, will not persist that store attribute.
  // whitelist: ['user'], // blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
