import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    token: null,
    comments: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode:(state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout:(state) =>{
            state.user = null;
            state.token = null;
        },
        setcomments: (state,action) =>{
            state.comments = action.payload.comments;
        },
        setComment: (state, action) =>{
            const updatedcomments = state.comments.map((comment) =>{
                if(comment._id === action.payload.comment_id) return action.payload.comment;
                return comment;
            });
            state.comments = updatedcomments;
        }
    }
})

export const {setMode, setLogin,setLogout, setcomments,setComment} = authSlice.actions;
export default authSlice.reducer;