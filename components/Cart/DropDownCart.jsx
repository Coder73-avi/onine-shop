import React, { useRef, useState, useEffect, useCallback } from "react";
import css from "./css/dropdowncart.module.css";
import Image from "next/image";
import axios from "controllers/axios";

import { IoClose } from "react-icons/io5";
import { AiFillShopping } from "react-icons/ai";

import defaultImage from "images/default-image-300x300.png";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { getCartTotal } from "controllers/Reducer/reducer";
import Link from "next/link";
import DefaultImage from "components/DefaultImage";
import { removeItemFromCart } from "controllers/cartControl";
import { formatingNumber } from "controllers/otherFunctions";

const DropDownCart = ({ setShowCart, carts }) => {
  const dropCartRef = useRef();
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const toggleCart = (e) => {
      if (!dropCartRef?.current?.contains(e.target)) setShowCart(false);
    };
    document.addEventListener("mousedown", toggleCart);
    return () => document.removeEventListener("mousedown", toggleCart);
  }, [setShowCart]);

  return (
    <div className={`${css.DropDownCart}`} ref={dropCartRef}>
      {carts?.map((val, indx) => {
        const title = val?.title?.slice(0, 20);
        const subtotal = parseInt(val?.qty) * parseInt(val?.price);
        return (
          <div
            className={`grid grid-cols-5 gap-3 justify-center my-4 relative ${
              carts?.length > indx + 1 && "border-b"
            }`}
            key={indx}
          >
            <div className="col-span-2">
              <div className="relative rounded-sm overflow-hidden w-[80px] md:w-[100px] ">
                <DefaultImage
                  src={val?.imageSrc || defaultImage}
                  alt={val?.originalname || "checkout-image"}
                />
              </div>
            </div>
            <div className="col-span-3">
              <h1 className="text-sm font-bold text-gray-800">
                {title} {title?.length > 20 && " . . ."}
              </h1>
              <h4 className="text-gray-500 flex flex-row gap-0 items-center text-xs">
                {val?.qty || 1} <IoClose /> Rs {formatingNumber(val?.price)} ={" "}
                <span className="underline italic ml-3 text-gray-700">
                  {" Rs. "}
                  {formatingNumber(subtotal)}
                </span>
              </h4>
              {/* <h4 className="text-gray-500 text-xs">
              Sub total = {parseInt(val?.qty) * parseInt(val?.product?.price)}
            </h4> */}
            </div>
            <div
              className="absolute right-0 bottom-0 flex flex-row justify-end"
              onClick={async () => {
                await removeItemFromCart(val?.id, val?.qty);
                dispatch({ type: "UPDATE__CART" });
                return setShowCart(false);
              }}
            >
              {/* <IoClose className={css.closeBtn} /> */}
              <i className="text-red-500 text-xs cursor-pointer">Remove</i>
            </div>
          </div>
        );
      })}

      <div className={css.subTotal__btn}>
        <div className="flex flex-row justify-between items-center font-bold py-4">
          <h2 className="uppercase ">Total: </h2>
          <h2 className="text-teal-700">
            Rs {formatingNumber(getCartTotal(carts))}
          </h2>
        </div>

        <Link href="/checkout">
          <button
            className={css.checkoutBtn}
            onClick={() => setShowCart(false)}
          >
            <span className="text-lg">
              <AiFillShopping />
            </span>
            Check Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DropDownCart;
