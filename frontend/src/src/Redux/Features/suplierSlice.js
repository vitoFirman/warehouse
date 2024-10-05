import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const supplierList = createAsyncThunk('supplierList', async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('https://inventory.vito.web.id/api/suplier/list', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const supllierSlice = createSlice({
    name: 'supplier',
    initialState: {
        data: [],
        loading: false,
        error: null
    }, 
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(supplierList.pending, (state) => {
            state.loading = true
        })
        .addCase(supplierList.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(supplierList.rejected, (state, actions) => {
            state.loading = false
            state.error = actions.error.message
        })
    }
})

export default supllierSlice.reducer