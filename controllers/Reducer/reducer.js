export const initialState = {
  isAuth: false,
  cart: [{ id: 1110, price: "3000", qty: 1, title: "Vestibulum suscipit" }],
};

export const getCartTotal = (cart) => {
  return cart?.reduce(
    (amount, item) => parseInt(item.price * item.qty) + amount,
    0
  );
};

export default function reducer(state, action) {
  switch (action.type) {
    case "":
      return { ...state };
    case "ADDTOCART":
      // const objIndx = state.cart?.findIndex((val) => val.id === action.cart.id);
      // if (objIndx >= 0) {
      //   const newQty = action.cart.qty + 1;
      //   action.cart.qty = newQty;

      //   state.cart[objIndx].qty += 1;
      //   return state;
      // }
      return { ...state, cart: [...state.cart, action.cart] };

    case "REMOVE__ITEMS__FROM__CART":
      const filterCart = state.cart.filter(
        (val, indx) => indx !== action.removeIndx
      );
      return {
        ...state,
        cart: filterCart,
      };

    case "EMPTYCART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}
