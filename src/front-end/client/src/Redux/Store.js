import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./Student";
import { lecturerReducer } from "./Lecturer"
import { topicReducer } from "./Topic"

const store = configureStore({
    reducer:{
        studentFilter: studentReducer,
        lecturerFilter: lecturerReducer,
        topicFilter: topicReducer
    }
})

export default store;