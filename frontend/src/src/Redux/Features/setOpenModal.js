import { createSlice } from "@reduxjs/toolkit";

export const setOpenModal = createSlice({
    name: 'modal',
    initialState: {
        open: null
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload
        }
    }
})

export const {setOpen} = setOpenModal.actions
export default setOpenModal.reducer