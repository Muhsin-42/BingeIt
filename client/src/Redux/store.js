import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  messages: [],
  notificationCount: 0,
  notifications: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload.reviews;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
      state.notificationCount = action.payload.notificationCount;
    },
    setGroups: (state, action) => {
      state.groups = action.payload.groups;
    },
    pushMessages: (state, action) => {
      const message = action.payload.newMessage;
      state.groups = state.groups.map((group) =>
        group._id === message.selectedCommunity
          ? {
              ...group,
              messages: [...group.messages, message],
            }
          : group
      );
    },

    addGroup: (state, action) => {
      state.groups.unshift(action.payload.newGroup);
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setPosts,
  setPost,
  setUser,
  setMessages,
  setToken,
  setReviews,
  setNotifications,
  setGroups,
  addGroup,
  pushMessages,
} = authSlice.actions;
export default authSlice.reducer;
