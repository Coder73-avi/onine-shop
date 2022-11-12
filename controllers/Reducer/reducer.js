export const initialState = {
  isAuth: false,
  cartChange: 0,
  checkoutChange: 0,
  carts: [],
  user: null,
  token: null,
};

export const getCartTotal = (cart) => {
  return cart?.reduce(
    (amount, item) => parseInt(item?.product?.price * item.qty) + amount,
    0
  );
};

export default function reducer(state, action) {
  switch (action.type) {
    case "":
      return { ...state };
    case "UPDATE__CART":
      return { ...state, cartChange: Math.random() };
    case "ADD__TO__CART":
      return { ...state, carts: [...action.carts] };
    case "SET__TOKEN":
      return { ...state, token: action.token };
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

    case "AUTH__USER":
      return { ...state, user: action.user };

    case "CHECKOUT":
      return { ...state, checkout: action.checkout };
    default:
      return state;
  }
}
