import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: '',
    departmentId: '',
}

const lecturerFilterReducer = createSlice({
    name: 'lecturerFilter',
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
} = lecturerFilterReducer.actions;

export const lecturerReducer = lecturerFilterReducer.reducer;