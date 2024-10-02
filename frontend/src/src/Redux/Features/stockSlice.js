import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const stockIn = createAsyncThunk('stockIn', async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/api/stock/in/list', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const stockOut = createAsyncThunk('stockOut', async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/api/stock/out/list', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        stockIn: {
            data: [],
            loading: false,
            error: null
        },
        stockOut: {
            data: [],
            loading: false,
            error: null
        }
    }, 
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Stock In
        .addCase(stockIn.pending, (state) => {
            state.stockIn.loading = true
        })
        .addCase(stockIn.fulfilled, (state, action) => {
            state.stockIn.loading = false
            state.stockIn.data = action.payload
        })
        .addCase(stockIn.rejected, (state, actions) => {
            state.stockIn.loading = false
            state.stockIn.error = actions.error.message
        })
        // Stock Out
        .addCase(stockOut.pending, (state) => {
            state.stockOut.loading = true
        })
        .addCase(stockOut.fulfilled, (state, action) => {
            state.stockOut.loading = false
            state.stockOut.data = action.payload
        })
        .addCase(stockOut.rejected, (state, actions) => {
            state.stockOut.loading = false
            state.stockOut.error = actions.error.message
        })
    }
})

export default stockSlice.reducer