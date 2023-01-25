import DefaultImage from "components/DefaultImage";
import ProductRating from "components/ProductRating";
import { addToCart } from "controllers/cartControl";
import { formatingNumber } from "controllers/otherFunctions";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import css from "./quickview.module.css";

import axios from "controllers/axios";
import { addToWishList } from "controllers/wishListControl";
import { useStateValue } from "controllers/Reducer/stateProvider";

const QuickView = ({ setQuickView, data }) => {
  const quickViewRef = useRef();
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const [activeStatus, setActiveStatus] = useState(false);
  const [productQty, setProductQty] = useState(1);

  const AddToCart = async (buy = false) => {
    try {
      if (user == null) {
        return router.push("/login");
      }
      if (productQty < 1) {
        setProductQty(1);
      }
      await addToCart({
        product__id: data?.pid,
        qty: productQty,
        product__option: "",
      });
      dispatch({
        type: "UPDATE__CART",
      });

      if (buy) {
        return router.push("/checkout");
      }
      return true;
    } catch (error) {
      router.push("/login");
      console.error(error);
    }
  };

  const AddToWishList = async () => {
    try {
      if (!user) {
        return router.push("/login");
      }

      const req = await axios.get("/getwishlists");
      const found = req.data?.some((val) => val.product__id == data.id);

      if (found) {
        const remove = await axios.delete("/deletewishlist/" + data.id);
        if (remove.status == 200) return setActiveStatus(false);
      }

      await addToWishList({ product__id: data.id });
      return setActiveStatus(true);
    } catch (error) {
      router.push("/login");
      // console.error(error);
    }
  };

  const checkWishListIsActive = useCallback(async () => {
    try {
      const req = await axios.get("/getwishlists");
      if (req.status == 200) {
        const wishlistData = req.data;
        console.log(wishlistData);

        const found = wishlistData?.some((val) => val.pid == data.id);
        if (found) setActiveStatus(found);
        console.log(found);
      }
    } catch (error) {
      // console.error(error);
    }
  }, [data?.id]);

  useEffect(() => {
    if (user) checkWishListIsActive();
  }, [checkWishListIsActive, user]);

  useEffect(() => {
    const handle = (e) => {
      if (!quickViewRef.current?.contains(e.target)) return setQuickView(false);
    };
    addEventListener("mousedown", handle);
    return () => removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className={css.quickView}>
      <div className="flex flex-col justify-center items-center h-full    ">
        <div
          ref={quickViewRef}
          className={
            "grid md:grid-cols-2 justify-center items-center bg-white w-[70%] min-h-[80%] rounded-lg gap-6 relative overflow-auto px-3 " +
            css.divScroll
          }
        >
          <div
            className=" absolute top-4 right-6 z-50 text-3xl cursor-pointer text-teal-600"
            onClick={() => setQuickView(false)}
          >
            <IoClose />
          </div>
          <div className="relative rounded-md overflow-hidden ">
            {data?.isNew ? <div className={css.newBtn}>New</div> : null}
            {data?.onSale == "1" ? (
              <div
                className={css.saleBtn}
                style={{ right: `${data?.isNew ? "2.7rem " : "0"}` }}
              >
                Sale !
              </div>
            ) : null}
            <DefaultImage src={data?.image?.src} alt={data?.image.alt} />
          </div>
          <article className={css.product__info + " p-4"}>
            <h1 className="text-2xl font-bold mb-2">{data?.title}</h1>
            <ProductRating maxRating={4} />
            <div className="text-2xl my-2 font-bold text-teal-600">
              Rs. {formatingNumber(parseInt(data?.price))}
            </div>
            <hr />
            <div className="my-3">
              <h4 className="text-sm text-gray-600 font-bold py-3">
                Details:{" "}
              </h4>
              <p className="text-gray-700 text-sm">
                {data?.short__discription}
              </p>
            </div>
            <div className="text-lg text-teal-600 font-bold mb-3">In Stock</div>
            <div className="flex flex-row gap-4 flex-wrap lg:flex-nowrap">
              <div className="border border-gray-400  rounded-md">
                <button
                  className="pl-4 pr-4 hover:text-gray-500"
                  disabled={productQty <= 1 ? true : false}
                  onClick={() => {
                    setProductQty(productQty - 1);
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-6 outline-none text-sm py-2.5"
                  defaultValue={productQty}
                />
                <button
                  className="hover:text-gray-500 pr-4"
                  disabled={productQty >= 100 && productQty <= 0 ? true : false}
                  onClick={() => {
                    setProductQty(productQty + 1);
                  }}
                >
                  +
                </button>
              </div>

              <div className="flex flex-row gap-2">
                <button className={css.buyBtn} onClick={AddToCart}>
                  <BsCartCheckFill className="text-lg" /> Add To Cart
                </button>
                <button className={css.buyBtn} onClick={() => AddToCart(true)}>
                  Buy Now
                </button>
                <button
                  className={`${
                    activeStatus ? "text-white bg-teal-700 " : "text-gray-400 "
                  } text-xl border px-3 rounded-md transition hover:text-white hover:bg-teal-700 `}
                  onClick={AddToWishList}
                >
                  <AiFillStar />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
