// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import expireReducer from "redux-persist-expire";

// Configuração de persistência
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    expireReducer("user", {
      expireSeconds: 900, // 15 minutos
      autoExpire: true, // Limpa automaticamente após expiração
    }),
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore as ações específicas do redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
