import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { api } from "./reducer";
import authSlice from "./authSlice";
import userSlice from "./client/userSlice";
import { userAPI } from "./client/userReducer";
import cartSlice from "./client/cartSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  admin: authSlice,
  [userAPI.reducerPath]: userAPI.reducer,
  [api.reducerPath]: api.reducer,
});
const persisted = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisted,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware, userAPI.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
