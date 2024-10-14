import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Config/Axios";

export const reportsStockList = createAsyncThunk('reportsStockList', async (month) => {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${baseUrl}/reports/stock/${month}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const reportsStockSlice = createSlice({
    name: 'reportsStock',
    initialState: {
        data: [],
        loading: false,
        error: null
    }, 
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(reportsStockList.pending, (state) => {
            state.loading = true
        })
        .addCase(reportsStockList.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(reportsStockList.rejected, (state, actions) => {
            state.loading = false
            state.error = actions.error.message
        })
    }
})

export default reportsStockSlice.reducer