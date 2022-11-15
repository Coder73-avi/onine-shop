import { getCartTotal } from "controllers/Reducer/reducer";
import React from "react";
import css from "./css/orderdetails.module.css";
import axios from "controllers/axios";
import { useRouter } from "next/router";
import { uid } from "uid";
import { formatingNumber } from "controllers/otherFunctions";

const OrderSummary = ({ carts, dispatch, address__id }) => {
  const router = useRouter();

  const sendOrder = async () => {
    try {
      if (carts.length == 0) return router.push("/shop");
      const collection__id = uid(10);
      const newCart = carts?.map((val) => {
        return {
          collection__id,
          product__id: val?.pid,
          title: val?.title,
          qty: val?.qty,
          address__id,
          price: val?.price,
          category: val?.category,
          status: "processing",
          review: "0",
        };
      });

      const req = await axios.post("/addorders", newCart);
      if (req.status == 201) {
        dispatch({ type: "UPDATE__CART" });
        router.push("/myaccount?name=my-orders");
      }
    } catch (error) {
      alert("Sorry Order is not made.");
      // return console.error(error);
    }
  };

  return (
    <section className="bg-gray-100 px-2 lg:px-6 py-4 rounded-md shadow-sm">
      <h1 className="uppercase py-2 font-bold text-sm text-gray-700">
        Order Summary
      </h1>
      <hr className="mb-3" />
      <div className="px-2 lg:px-4 md:text-xs lg:text-sm ">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 items-center justify-between text-gray-700 mb-2">
          <div className="capitalized font-semibold">Total Amount</div>
          <div className="italic">
            Rs. {formatingNumber(getCartTotal(carts))}
          </div>
          <div className="capitalized  font-semibold">Delivery Fee</div>
          <div className="italic">Rs. 160</div>
          <div className="capitalized font-semibold">Delivery Discount</div>
          <div className="italic">- Rs. 80</div>
          <div className="capitalized  font-bold">Total Payment</div>
          <div className=" italic underline text-teal-600">
            Rs. {formatingNumber(parseInt(getCartTotal(carts) + 160 - 80))}
          </div>
        </div>
        <p className="italic text-gray-600 underline text-right">
          All Tax Included
        </p>
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
