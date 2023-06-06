import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: '',
    departmentId: '',
    lecturerId: '',
    statusId: '',
    year: '',
    month: '',
}

const topicFilterReducer = createSlice({
    name: 'topicFilter',
    initialState,
    reducers:{
        reset: (state, action) => {
            return initialState;
        },
        updateKeyword: (state, action) => {
            return {
                ...state,
                keyword: action.payload
            }
        },
        updateDepartmentId: (state, action) => {
            return {
                ...state,
                departmentId: action.payload
            }
        },
        updateLecturerId: (state, action) => {
            return {
                ...state,
                lecturerId: action.payload
            }
        },
        updateStatusId: (state, action) => {
            return {
                ...state,
                statusId: action.payload
            }
        },
        updateMonth: (state, action) => {
            return {
                ...state,
                month: action.payload
            }
        },
        updateYear: (state, action) => {
            return {
                ...state,
                year: action.payload
            }
        }
    }
})

export const {
    reset,
    updateKeyword,
    updateDepartmentId,
    updateLecturerId,
    updateStatusId,
    updateMonth,
    updateYear
} = topicFilterReducer.actions;

export const topicReducer = topicFilterReducer.reducer;