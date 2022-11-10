import React, { useRef, useState, useEffect, useCallback } from "react";
import css from "./css/dropdowncart.module.css";
import Image from "next/image";
import axios from "controllers/axios";

import { MdArrowForwardIos } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import defaultImage from "images/default-image-300x300.png";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { getCartTotal } from "controllers/Reducer/reducer";
import Link from "next/link";
import DefaultImage from "components/DefaultImage";
import { removeItemFromCart } from "controllers/cartControl";

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
        const title = val?.product?.title.slice(0, 20);
        return (
          <div
            className={`grid grid-cols-5 gap-3 justify-center my-4 relative ${
              carts?.length > indx + 1 && "border-b"
            }`}
            key={indx}
          >
            <div className="col-span-2">
              <div className="relative rounded-sm overflow-hidden w-[100px]">
                <DefaultImage
                  src={val?.imageSrc || defaultImage}
                  alt={val?.originalname || "checkout-image"}
                />
              </div>
            </div>
            <div className="col-span-3">
              <h1 className="text-sm font-medium">
                {title} {title.length > 20 && " . . ."}
              </h1>
              <h4 className="text-gray-500 flex flex-row gap-0 items-center text-xs">
                {val?.qty || 1} <IoClose /> Rs {val?.product?.price} ={" "}
                <span className="underline italic ml-3 text-gray-600">
                  {" Rs. "}
                  {parseInt(val?.qty) * parseInt(val?.product?.price)}
                </span>
              </h4>
              {/* <h4 className="text-gray-500 text-xs">
              Sub total = {parseInt(val?.qty) * parseInt(val?.product?.price)}
            </h4> */}
            </div>
            <div
              className="absolute right-0 bottom-0 flex flex-row justify-end"
              onClick={async () => {
                await removeItemFromCart(val?.id);
                dispatch({ type: "UPDATE__CART" });
                setShowCart(false);
              }}
            >
              {/* <IoClose className={css.closeBtn} /> */}
              <i className="text-red-500 text-xs cursor-pointer">Remove</i>
            </div>
          </div>
        );
      })}
      <hr />
      <div className="flex flex-row justify-between items-center text-bold py-4">
        <h2>Total: </h2>
        <h2>Rs {getCartTotal(carts)}</h2>
      </div>

      <Link href="/checkout">
        <button className={css.checkoutBtn} onClick={() => setShowCart(false)}>
          Check Out
          <span>
            <MdArrowForwardIos />
          </span>
        </button>
      </Link>
    </div>
  );
};

export default DropDownCart;
