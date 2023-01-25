export const updateCarts = (state, action) => {
  const getCart = state.carts;
  const { id } = action;
  const carts = getCart
    ?.filter((item) => {
      if (item?.id === id) {
        if (item.qty == 1) return;
      }
      return item;
    })
    .map((item) => {
      if (item?.id === id) {
        return { ...item, qty: Number(item.qty) - 1 };
      }
      return item;
    });
  console.log(
    ">> ",
    carts.find((a) => a?.id == id),
  );
  return { ...state, carts };
};
