import { createSlice } from "@reduxjs/toolkit";
import { login } from "./UserAPI";

const initialState = {
    user: null,
    cart: [], //{_id, name, price, quantity, images}
};

const appSlice = createSlice({
    name: "app",
    initialState: {
        cart: [],
        user: null,
        initiaRouteNameUser: 'Welcome'
    },
    reducers: {
        addItemToCart: (state, action) => {
            //Kiểm tra sp có trong giỏ hàng hay không
            const index = state.cart.findIndex(item => item._id.toString() == action.payload._id.toString());
            if (index >= 0) {
                state.cart[index].quantity += action.payload.quantity;
            } else {
                state.cart = [...state.cart, action.payload];
            }
        },
        removeItemFromCart: (state, action) => {
            // Loại bỏ sản phẩm khỏi giỏ
            state.cart = state.cart.filter(item => item._id !== action.payload._id);
        },
        incrementQuantity: (state, action) => {
            // Tăng số lượng sản phẩm
            const index = state.cart.findIndex(item => item._id === action.payload._id);
            if (index >= 0) {
                state.cart[index].quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            // Giảm số lượng sản phẩm
            const index = state.cart.findIndex(item => item._id === action.payload._id);
            if (index >= 0 && state.cart[index].quantity > 1) {
                state.cart[index].quantity -= 1;
            }
        },
        logout: (state, action) => {
            state.user = null;
            state.initiaRouteNameUser = 'Login'
        },
        clearCart: (state) => {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            console.log("...Pending");
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log("...Rejected");

        });
    }
});

export const { addItemToCart,clearCart, logout, removeItemFromCart, incrementQuantity, decrementQuantity } = appSlice.actions;
export default appSlice.reducer;