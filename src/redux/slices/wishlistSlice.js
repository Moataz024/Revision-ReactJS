import { createSlice } from "@reduxjs/toolkit";
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addtowishlist: (state, action) => {
      const payload = action.payload;
      const exists = state.wishlist.some((item)=> item === payload.id);
      if(exists){
        console.log("exists");
      }else{
        state.wishlist.push(payload.id);
        console.log("doesn't exist");
      }
    },
    decrement: (state, action) => {
      const payload = action.payload;
      state.wishlist.splice(0,state.wishlist.length);
    },
    remove: (state, action) => {
      const payload = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== payload.id);
    },
    empty: (state) => {
      state.wishlist = [];
    },
  },
});
export const { addtowishlist, decrement, remove, empty } = wishlistSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.wishlist.value)`

export const selectCountOf = (state, payload) => {
  return (
    state.wishlist.wishlist?.find((item) => item.id === payload.id)
      ?.nbParticipants || 0
  );
};

export const selectCountAll = (state) => {
  return state.wishlist.wishlist?.reduce(
    (acc, curr) => acc + curr.nbParticipants,
    0
  );
};

export const selectTotal = (state) => {
  return state.wishlist.wishlist?.reduce(
    (acc, curr) => acc + curr.nbParticipants * curr.price,
    0
  );
};

export const selectWishlist = (state) => {
  return state.wishlist.wishlist;
};


export default wishlistSlice.reducer;