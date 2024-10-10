import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Config/Axios";

export const productList = createAsyncThunk('productList', async (page = null) => {
    const token = localStorage.getItem('token')
    if(page) {
        const res = await axios.get(`${baseUrl}/product/list/paginate?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } else {
        const res = await axios.get(`${baseUrl}/product/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    }
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