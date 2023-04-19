import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import authReducer from "./Redux/store";
import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import storage from "redux-persist/lib/storage";
import { BrowserRouter } from "react-router-dom";
import { DarkModeContextProvider } from "./context/darkModeContext";




const persistConfig = { key: "admin", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistStore(store)}>
  <React.StrictMode>
  <DarkModeContextProvider>
  
     <BrowserRouter>
    <App />
</BrowserRouter>
</DarkModeContextProvider>

  </React.StrictMode>
    </PersistGate>
    </Provider>
);



