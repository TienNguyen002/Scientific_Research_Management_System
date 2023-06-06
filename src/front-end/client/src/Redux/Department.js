import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: '',
}

const departmentFilterReducer = createSlice({
    name: 'departmentFilter',
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
    }
})

export const {
    reset,
    updateKeyword,
} = departmentFilterReducer.actions;

export const departmentReducer = departmentFilterReducer.reducer;