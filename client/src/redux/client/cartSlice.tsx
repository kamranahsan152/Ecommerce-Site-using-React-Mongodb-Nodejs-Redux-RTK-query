/* eslint-disable import/named */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  items: any[];
}
const initialState: UserState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: any) => {
      const isExist = state.items.find(
        (item) => item._id === action.payload?._id
      );

      if (isExist) {
        isExist.sum += action.payload?.price;
        isExist.qty += 1;
      } else {
        state.items.push({
          ...action.payload,
          sum: action.payload?.price,
          qty: 1,
        });
      }
    },
    removeItemFromCart: (state, action: any) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload?._id
      );
    },
    removeSingleItem: (state, action: any) => {
      const isExist = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (isExist && isExist.qty > 1) {
        isExist.qty -= 1;
        isExist.sum -= action.payload.price;
      } else {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ _id: number; qty: number }>
    ) => {
      const isExist = state.items.find(
        (item) => item._id === action.payload?._id
      );
      if (isExist) {
        isExist.qty = action.payload?.qty;
        isExist.sum = isExist.price * action.payload?.qty;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeItemFromCart,
  removeSingleItem,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
