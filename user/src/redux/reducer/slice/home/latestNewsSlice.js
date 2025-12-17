import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../initialState"

const latestNews = createSlice({
    name: "latestNews",
    initialState: initialState,
    reducers: {
        getLatestNews: (state) => {
            state.isFetching = true
        },
       
        success: (state, action) => {
            if (action?.payload?.data) {
                state.data = action?.payload?.data;
            }
            if (action?.payload?.message) {
                state.data.message = action?.payload?.message
            }
            if (action?.payload?.status === true || action?.payload?.status === false) {
                state.data.status = action?.payload?.status
            }
            state.isFetching = false
        },
        update_success: (state, action) => {
            if (action?.payload?.data?.data) {
                state.data.userData = action?.payload?.data?.data;
            }
            if (action?.payload?.data?.message) {
                state.data.message = action?.payload?.data?.message
            }
            if (action?.payload?.data?.status === true || action?.payload?.data?.status === false) {
                state.data.status = action?.payload?.data?.status
            }
            state.isFetching = false
        },
        failed: (state, action) => {
            state.data = action.payload;
            state.isFetching = false
        },
        reset: (state) => {
            Object.assign(state, initialState)
        },
        clearMessage: (state) => {
            state.data.message = null
        }
    }
})
export const latestNewsActions = latestNews.actions;
export const latestNewsReducers = latestNews.reducer;