import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: '',
    departmentId: '',
}

const studentFilterReducer = createSlice({
    name: 'studentFilter',
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
        }
    }
})

export const {
    reset,
    updateKeyword,
    updateDepartmentId
} = studentFilterReducer.actions;

export const studentReducer = studentFilterReducer.reducer;