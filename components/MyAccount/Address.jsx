import React from "react";
import css from "./css/address.module.css";
import { FiEdit } from "react-icons/fi";

const Address = () => {
  return (
    <>
      <h1 className="text-lg font-extrabold my-2">My Billing Address</h1>
      <hr className="mb-4" />
      <div className="text-sm ">
        <h3 className="font-semibold text-gray-700  mb-4">Alex Tuntuni</h3>
        <div className="text-gray-500 mb-4">
          1355 Market St, <br />
          Suite 900 San Francisco, CA 94103
        </div>
        <div className="text-gray-500">Mobile: (123) 456-7890</div>

        <button className={css.edit__address}>
          <FiEdit /> Edit Address
        </button>
      </div>
    </>
  );
};

export default Address;
