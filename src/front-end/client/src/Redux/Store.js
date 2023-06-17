import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./Student";
import { lecturerReducer } from "./Lecturer"
import { topicReducer } from "./Topic"
import { departmentReducer } from "./Department"
import { feedbackReducer } from "./Feedback"

const store = configureStore({
    reducer:{
        studentFilter: studentReducer,
        lecturerFilter: lecturerReducer,
        topicFilter: topicReducer,
        departmentFilter: departmentReducer,
        feedbackFilter: feedbackReducer
    }
})

export default store;