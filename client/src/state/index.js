import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    isLoading: false,
    isOpenSnackbar: false,
    snackbarType: 'success',
    snackbarMessage: ''
}

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
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("user friends do not exist")
            }
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
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setSnackBar: (state, action) => {
            state.isOpenSnackbar = action.payload.isOpenSnackbar;
            state.snackbarType = action.payload.snackbarType;
            state.snackbarMessage = action.payload.snackbarMessage;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setLoading, setSnackBar } = authSlice.actions;
export default authSlice.reducer;