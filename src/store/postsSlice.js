import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    posts: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        updatePosts: (state, action) => {
            state.status = true;
            state.posts = action.payload.posts;
        }
     }
})

export const {updatePosts} = postsSlice.actions;

export default postsSlice.reducer;