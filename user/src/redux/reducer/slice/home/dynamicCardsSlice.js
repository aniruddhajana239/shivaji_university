import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../../initialState";

const DynamicCards = createSlice({
    name: "dynamicCards",
    initialState: {
        ...initialState,
        cards: {} // Keyed by menu_id
    },
    reducers: {
        getAll: (state, action) => {
            const { menu_id } = action.payload;
            if (!state.cards[menu_id]) {
                state.cards[menu_id] = { data: {}, isFetching: true };
            } else {
                state.cards[menu_id].isFetching = true;
            }
        },
        success: (state, action) => {
            const { menu_id, data } = action.payload;
            if (!state.cards[menu_id]) {
                state.cards[menu_id] = { data: {}, isFetching: false };
            }
            state.cards[menu_id].data = data;
            state.cards[menu_id].isFetching = false;
        },
        failed: (state, action) => {
            const { menu_id, error } = action.payload;
            if (!state.cards[menu_id]) {
                state.cards[menu_id] = { data: {}, isFetching: false };
            }
            state.cards[menu_id].error = error;
            state.cards[menu_id].isFetching = false;
        },
        reset: (state) => {
            state.cards = {};
        }
    }
});

export const DynamicCardsActions = DynamicCards.actions;
export const DynamicCardsReducers = DynamicCards.reducer;
