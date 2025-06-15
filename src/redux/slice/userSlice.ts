import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApis from "@/apis/userApis";
import type { UserDataType } from "@/types/types";

interface UserState {
    users : any,
    loading : boolean,
    error: string | null
}

let initialState : UserState = {
    users : {},
    loading : false,
    error : null
}

export const getUsers = createAsyncThunk('users/getUsers', async (page) => {
    const response = await userApis.getUserList('/users' , {
        page
    });
    return response.data;
})

export const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        addUser : (state, action) => {
            state.users.data = [...state.users.data , {...action.payload, id: state.users.data.length + 1}]
            state.users.total++;
            state.users.total_pages = Math.ceil(state.users.total / state.users.per_page);
        },
        deleteUser : (state, action) => {
            state.users.data = state.users.data.filter((user : UserDataType) => user.id != action.payload) ,
            state.users.total--;
            state.users.total_pages = Math.ceil(state.users.total / state.users.per_page);
        },
        updateUser : (state, action) => {
            let newData = action.payload;
            state.users.data[state.users.data.findIndex((user : UserDataType) => user.id === action.payload.id)] = newData;
        },
        updatePage : (state, action) => {
            state.users.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending , (state) => {
            state.loading = true;
            state.error = null;
        }),
        builder.addCase(getUsers.fulfilled , (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        }),
        builder.addCase(getUsers.rejected , (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something Went Wrong';
        })
    }
})

export const {addUser, deleteUser, updateUser, updatePage} = userSlice.actions
export default userSlice.reducer;