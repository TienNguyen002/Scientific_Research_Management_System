import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./Student";
import { lecturerReducer } from "./Lecturer"
import { topicReducer } from "./Topic"
import { departmentReducer } from "./Department"

const store = configureStore({
    reducer:{
        studentFilter: studentReducer,
        lecturerFilter: lecturerReducer,
        topicFilter: topicReducer,
        departmentFilter: departmentReducer
    }
})

export default store;