const AddToCart = () => {
  dispatch({
    type: "ADDTOCART",
    cart: { id, imgSrc: imageSrc, title, price, qty: 1 },
  });
  toast.info("Add To Cart", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const AddToWishList = ({id}) => {
  const oldData = JSON.parse(window.localStorage?.getItem("wiselist"));
  const check = oldData?.some((val) => val.id == id);
  console.log(check);

  if (check) {
    const filterData = oldData.filter((val) => val.id !== id);
    setActiveStatus(false);
    return window.localStorage.setItem("wiselist", JSON.stringify(filterData));
  }
  setActiveStatus(true);
  const newData = [
    ...(oldData || []),
    {
      id,
      imageSrc,
      title,
      price,
    },
  ];
  return window.localStorage.setItem("wiselist", JSON.stringify(newData));
};
