import React, { useRef, useState, useEffect } from "react";
import css from "./css/dropdowncart.module.css";
import Image from "next/image";

import { MdArrowForwardIos } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import bed from "images/home/bed.jpg";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { toast } from "react-toastify";
import { getCartTotal } from "controllers/Reducer/reducer";
import Link from "next/link";
import DefaultImage from "components/DefaultImage";

const DropDownCart = ({ setShowCart }) => {
  const dropCartRef = useRef();
  const [{ cart }, dispatch] = useStateValue();
console.log(cart)
  useEffect(() => {
    const toggleCart = (e) => {
      if (!dropCartRef?.current?.contains(e.target)) setShowCart(false);
    };

    document.addEventListener("mousedown", toggleCart);
    return () => document.removeEventListener("mousedown", toggleCart);
  }, [setShowCart]);

  return (
    <div className={`${css.DropDownCart}`} ref={dropCartRef}>
      {cart.map((val, indx) => (
        <div className="grid grid-cols-6 gap-3 justify-center my-4" key={indx}>
          <div className="col-span-2">
            <div className="relative rounded-sm overflow-hidden">
              <Image
                src={val?.imgSrc || bed}
                alt="checkout-image"
                layout="responsive"
                height={20}
                width={20}
                objectFit="contain"
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-span-3">
            <h1 className="text-sm font-medium">{val?.title}</h1>
            <h4 className="text-gray-500 text-xs">S, Blue</h4>
            <h4 className="text-gray-500 flex flex-row gap-0 items-center text-xs">
              {val?.qty || 1} <IoClose /> Rs {val?.price}
            </h4>
          </div>
          <div
            className="col-span-1 flex flex-row justify-end"
            onClick={() => {
              dispatch({ type: "REMOVE__ITEMS__FROM__CART", removeIndx: indx });
              toast.success("Removed from cart!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            <IoClose className={css.closeBtn} />
          </div>
        </div>
      ))}
      <hr />
      <div className="flex flex-row justify-between items-center text-bold py-4">
        <h2>Total: </h2>
        <h2>Rs {getCartTotal(cart)}</h2>
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
