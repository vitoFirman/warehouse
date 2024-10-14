import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/userSlice";
import  productSlice  from "../Features/productSlice";
import  supllierSlice  from "../Features/suplierSlice";
import stockSlice from "../Features/stockSlice";
import setOpenSidebar from "../Features/setOpenSidebar";
import setOpenModal  from "../Features/setOpenModal";
import reportsStockSlice  from "../Features/reportsStockSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        product: productSlice,
        supplier: supllierSlice,
        stock: stockSlice,
        sidebar: setOpenSidebar,
        modal: setOpenModal,
        reportsStock: reportsStockSlice
    }
})