import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    admin: null,
    token:null,
    posts : []    
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {  
            state.admin = action.payload.admin;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.admin = null;
            state.token = null;
        },

        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setUser: (state, action) => {
            state.admin = action.payload.admin;
        },
        setMessages: (state, action) => {
            state.messages = action.payload.messages;
        },
        setAllUsers :(state,action)=>{
            state.allUsers=action.payload.allUsers;
        },
        setPosts :(state,action)=>{
            state.posts = action.payload.posts;
        },
        setReviews : (state,action)=>{
            state.reviews = action.payload.reviews;
        },
        removeReview: (state, action) => {
            const reviewId = action.payload.reviewId;
            state.reviews = state.reviews.filter((review) => review.id !== reviewId);
          },
        setReports : (state,action)=>{
            state.reports = action.payload.reports;
        },
    },
});

export const { setMode, setLogin, setLogout,setMove, setPost, setUser, setMessages, setAllUsers, setPosts, setReviews, setReports,removeReview } =
    authSlice.actions;
export default authSlice.reducer;