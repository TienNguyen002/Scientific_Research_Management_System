import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./Student";

const store = configureStore({
    reducer:{
        studentFilter: studentReducer,
    }
})

export default store;