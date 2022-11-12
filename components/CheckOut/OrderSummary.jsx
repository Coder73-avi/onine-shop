import { getCartTotal } from "controllers/Reducer/reducer";
import React from "react";
import css from "./css/orderdetails.module.css";
import axios from "controllers/axios";
import { useRouter } from "next/router";
import { uid } from "uid";

const OrderSummary = ({ carts, dispatch, address__id }) => {
  const router = useRouter();

  const sendOrder = async () => {
    try {
      const collection__id = uid(10);
      const newCart = carts?.map((val) => {
        return {
          collection__id,
          product__id: val?.product__id,
          title: val?.product?.title,
          qty: val?.qty,
          address__id,
          price: val?.product?.price,
          category: val?.product?.category,
          status: "processing",
          review: "0",
        };
      });

      const req = await axios.post("/addorders", newCart);
      if (req.status == 201) {
        dispatch({ type: "UPDATE__CART" });
        router.push("/shop");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-100 px-6 py-4 rounded-md shadow-sm">
      <h1 className="uppercase py-2 font-bold text-sm text-gray-700">
        Order Summary
      </h1>
      <hr className="mb-3" />
      <div className="px-4">
        <div className="flex flex-row items-center justify-between text-gray-700 mb-2">
          <div className="capitalized text-sm font-semibold">Items Total</div>
          <div className="text-sm italic">Rs. {getCartTotal(carts)}</div>
        </div>
        <div className="flex flex-row items-center justify-between text-gray-700 mb-2">
          <div className="capitalized text-sm font-semibold">Delivery Fee</div>
          <div className="text-sm italic">Rs. 160</div>
        </div>
        <div className="flex flex-row items-center justify-between text-gray-700 mb-2">
          <div className="capitalized text-sm font-semibold">
            Delivery Discount
          </div>
          <div className="text-sm italic">- Rs. 80</div>
        </div>
        <div className="flex flex-row items-center justify-between  text-gray-700 ">
          <div className="capitalized text-sm font-bold">Total Payment</div>
          <div className="text-sm italic underline text-teal-600">
            Rs. {parseInt(getCartTotal(carts) + 160 - 80)}
          </div>
        </div>
        <div className="flex flex-row itmes-center justify-end text-xs text-gray-600">
          All Tax Included
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <button className={css.placeOrder} onClick={sendOrder}>
          Place Order
        </button>
      </div>
    </section>
  );
};

export default OrderSummary;
