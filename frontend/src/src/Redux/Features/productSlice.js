import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productList = createAsyncThunk('productList', async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/api/product/list', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        loading: false,
        error: null
    }, 
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(productList.pending, (state) => {
            state.loading = true
        })
        .addCase(productList.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(productList.rejected, (state, actions) => {
            state.loading = false
            state.error = actions.error.message
        })
    }
})

export default productSlice.reducer