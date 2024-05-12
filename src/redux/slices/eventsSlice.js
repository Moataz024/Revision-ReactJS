import {createSlice} from "@reduxjs/toolkit";
import {getallEvents} from "../../service/api";

let initialState = {
    events: [],
    selectedEvent: {},
    errors: "",
};

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        populateEvents(state, action) {
            state.events = action.payload;
        },
        deleteEventReducer: (state, action) => {
            const payload = action.payload;
            state.events = state.events.filter(
                (eventItem) => eventItem.id !== payload
            );
        },
        addEventReducer: (state, action) => {
            const payload = action.payload;
            state.events.push(payload);
        },
        setErrors(state, action) {
            state.errors = action.payload;
        },
    },
});

export const fetchEvents = () => async (dispatch) => {
    try {
        const eventsResult = await getallEvents();
        dispatch(populateEvents(eventsResult.data));
        dispatch(setErrors(null));
    } catch (error) {
        dispatch(setErrors(error));
    }
};

export const selectEvents = (state) => {
    return [state.events.events, state.events.errors];
};

export const selectSelectedEvent = (state) => {
    return state.events.selectedEvent;
};

export const {
    populateEvents,
    setErrors,
    deleteEventReducer,
    addEventReducer,
} = eventsSlice.actions;

export default eventsSlice.reducer;