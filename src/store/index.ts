import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import albumReducer from './slices/albumSlice'; // Make sure the album slice is set up properly

// Persist configuration: specifies the slices to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['album', 'search'], // Specify which slices to persist (album data, search term, etc.)
};

// Combine all reducers (in case you have more slices, you can add them here)
const rootReducer = combineReducers({
  album: albumReducer, // Note: 'album' is the key for this slice
});

// Apply Redux Persist to root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid errors when working with non-serializable data
    }),
});

// Create a persistor (responsible for storing the persisted state in storage)
export const persistor = persistStore(store);

// Typed hooks for accessing state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
