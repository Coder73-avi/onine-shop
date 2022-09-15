import { getCartTotal } from "controllers/Reducer/reducer";
import { useStateValue } from "controllers/Reducer/stateProvider";
import React from "react";
import css from "./css/orderdetails.module.css";

const OrderrDetails = () => {
  const [{ cart }, dispatch] = useStateValue();
  return (
    <div className="bg-gray-100 px-10 py-8">
      <h1 className="uppercase py-2 font-bold text-base">Your Order</h1>
      <hr className="mb-3" />
      <div>
        <table className="w-full text-sm text-left">
          <thead className="text-sm uppercase">
            <tr className="border-b border-black py-3">
              <th scope="col" className="py-3">
                Product
              </th>
              <th scope="col" className="py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-lefts">
            {cart?.map((val, indx) => (
              <tr className="border-b" key={indx}>
                <td className="py-2">{val?.title} × 1 </td>
                <td className="py-2">Rs. {val?.price}</td>
              </tr>
            ))}

            <tr className=" border-b">
              <th className="py-4 font-bold">Cart Subtotal </th>
              <td className="py-4">Rs {getCartTotal(cart)}</td>
            </tr>

            <tr className="border-b">
              <th className="py-4">Shipping</th>
              <td className="py-4">Rs. 200</td>
            </tr>

            <tr className="font-bold">
              <th className="py-2">Order Total</th>
              <td className="py-2">Rs. {getCartTotal(cart) + 200}</td>
            </tr>
          </tbody>
        </table>

        <button className={css.placeOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default OrderrDetails;
