import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseUrl } from "../../Config/Axios";

export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${baseUrl}/user/info`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const userList = createAsyncThunk('userList', async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${baseUrl}/administration/user/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        fetchUser: {
            data: [],
            loading: false,
            error: null
        },
        userList: {
            data: [],
            loading: false,
            error: null
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetch user
        .addCase(fetchUser.pending, (state) => {
            state.fetchUser.loading = true
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.fetchUser.loading = false
            state.fetchUser.data = action.payload
        })
        .addCase(fetchUser.rejected, (state, actions) => {
            state.fetchUser.loading = false
            state.fetchUser.error = actions.error.message
        })
        //user list
        .addCase(userList.pending, (state) => {
            state.userList.loading = true
        })
        .addCase(userList.fulfilled, (state, action) => {
            state.userList.loading = false
            state.userList.data = action.payload
        })
        .addCase(userList.rejected, (state, actions) => {
            state.userList.loading = false
            state.userList.error = actions.error.message
        })
    }
})

export default userSlice.reducer