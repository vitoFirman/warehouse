import { createSlice } from "@reduxjs/toolkit";

export const setOpenSidebar = createSlice({
    name: 'sidebar',
    initialState: {
        open: false
    },
    reducers: {
        setOpen: (state) => {
            state.open = !state.open
        }
    }
})

export const {setOpen} = setOpenSidebar.actions
export default setOpenSidebar.reducer