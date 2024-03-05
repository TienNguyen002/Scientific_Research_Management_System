import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: '',
    month: '',
    year: '',
}

const feedbackFilterReducer = createSlice({
    name: 'feedbackFilter',
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
    updateMonth,
    updateYear
} = feedbackFilterReducer.actions;

export const feedbackReducer = feedbackFilterReducer.reducer;