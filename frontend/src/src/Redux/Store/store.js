import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/userSlice";
import  productSlice  from "../Features/productSlice";
import  supllierSlice  from "../Features/suplierSlice";
import stockSlice from "../Features/stockSlice";
import setOpenSidebar from "../Features/setOpenSidebar";

export default configureStore({
    reducer: {
        user: userSlice,
        product: productSlice,
        supplier: supllierSlice,
        stock: stockSlice,
        sidebar: setOpenSidebar
    }
})