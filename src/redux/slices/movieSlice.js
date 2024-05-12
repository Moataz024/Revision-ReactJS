import { createSlice } from "@reduxjs/toolkit";
export const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [],
    },
    reducers: {
        increment: (state, action) => {
            const payload = action.payload;
            const exists = state.wishlist.some((item)=>item === payload.id);
            if(exists){
                console.log("exists");
            }else{
                console.log("doesn't exist");
            }        },
        decrement: (state, action) => {
            const payload = action.payload;
            const index = state.movie.findIndex((item) => item.id === payload.id);
            if (index !== -1) {
                state.movie[index].nbParticipants -= 1;
                if (state.movie[index].nbParticipants === 0) {
                    state.movie.splice(index, 1);
                }
            }
        },
        remove: (state, action) => {
            const payload = action.payload;
            state.movie = state.movie.filter((item) => item.id !== payload.id);
        },
        empty: (state) => {
            state.movie = [];
        },
    },
});
export const { increment, decrement, remove, empty } = movieSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.movie.value)`

export const selectCountOf = (state, payload) => {
    return (
        state.movie.movie?.find((item) => item.id === payload.id)
            ?.nbParticipants || 0
    );
};

export const selectCountAll = (state) => {
    return state.movie.movie?.reduce(
        (acc, curr) => acc + curr.nbParticipants,
        0
    );
};

export const selectTotal = (state) => {
    return state.movie.movie?.reduce(
        (acc, curr) => acc + curr.nbParticipants * curr.price,
        0
    );
};

export const selectWishlist = (state) => {
    return state.movie.movie;
};

export default movieSlice.reducer;