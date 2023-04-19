import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./usernameReducer";
import userImageReducer from "./userImageReducer";

const store = configureStore({
  reducer: {
    username: usernameReducer,
    userImage: userImageReducer,
  },
});

export default store;
