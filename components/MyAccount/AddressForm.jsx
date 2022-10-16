import Inputbox from "components/FormElement/Inputbox";
import React, { useState } from "react";
import axios from "controllers/axios";

import { BsHandbagFill } from "react-icons/bs";
import { AiTwotoneHome } from "react-icons/ai";

const AddressForm = () => {
  const [inputData, setInputData] = useState({
    fullname: "",
    region: "",
    phonenumber: "",
    city: "",
    street: "",
    area: "",
    colony: "",
    address: "",
    deliveryat: "",
  });

  const inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  const submitBillingAddress = async (e) => {
    try {
      e.preventDefault();

      const req = await axios.post("/addbillingaddress", inputData);
      if (req.status == 201) {
        alert("Add Successfully");
        setInputData({
          fullname: "",
          region: "",
          phonenumber: "",
          city: "",
          street: "",
          area: "",
          colony: "",
          address: "",
          deliveryat: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitBillingAddress}>
        <div className="grid md:grid-cols-2 gap-8">
          <Inputbox
            title="Full name"
            placeholder={"Enter your first name and last name"}
            name="fullname"
            value={inputData?.fullname}
            onChange={inputHandle}
          />
          <Inputbox
            title="Region"
            placeholder={"Enter your region"}
            name="region"
            value={inputData?.region}
            onChange={inputHandle}
          />
          <Inputbox
            title="Phone number"
            placeholder={"Enter your phone number"}
            name="phonenumber"
            value={inputData?.phonenumber}
            onChange={inputHandle}
          />
          <Inputbox
            title="City"
            placeholder={"Enter your city name"}
            name="city"
            value={inputData?.city}
            onChange={inputHandle}
          />
          <Inputbox
            title="Building / House No / Floor / Street"
            placeholder={"Please enter"}
            name="street"
            value={inputData?.street}
            onChange={inputHandle}
          />
          <Inputbox
            title="Area"
            placeholder={"Please enter your area"}
            name="area"
            value={inputData?.area}
            onChange={inputHandle}
          />
          <Inputbox
            title="Colony / Suburb / Locality / Landmark"
            placeholder={"Please enter"}
            name="colony"
            value={inputData?.colony}
            onChange={inputHandle}
          />
          <Inputbox
            title="Address"
            placeholder={"For Example: House# 123, Street# 123, ABC Road"}
            name="address"
            value={inputData?.address}
            onChange={inputHandle}
          />
          <div></div>
          <div>
            <label htmlFor="" className="text-gray-700 font-bold text-sm">
              Select a label for effective delivery :
            </label>
            <div className="my-4 flex flex-row justify-start items-center gap-8">
              <button
                type="button"
                onClick={() =>
                  setInputData((pre) => ({ ...pre, deliveryat: "office" }))
                }
                className={`flex flex-row justify-center items-center gap-4 py-4 px-6 text-sm font-mono  border border-teal-300 rounded-md shadow focus:text-teal-600 ${
                  inputData?.deliveryat == "office" ? "text-teal-600" : ""
                }`}
              >
                <BsHandbagFill />
                Office
              </button>

              <button
                type="button"
                onClick={() =>
                  setInputData((pre) => ({ ...pre, deliveryat: "home" }))
                }
                className={`flex flex-row justify-center items-center gap-4 py-4 px-6 text-sm font-mono  border border-orange-400 rounded-md shadow focus:text-orange-600 ${
                  inputData?.deliveryat == "home" ? "text-orange-600" : ""
                }`}
              >
                <AiTwotoneHome />
                Home
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-center py-8">
          <div className="flex flex-row items-center gap-5">
            <button
              type="button"
              className={`flex flex-row justify-center items-center gap-4 py-3 px-6 text-sm font-medium min-w-[180px] rounded-sm border bg-gray-100 text-gray-600 hover:bg-gray-3 00`}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className={`flex flex-row justify-center items-center gap-4 py-3 px-6 text-sm font-medium min-w-[180px] rounded-sm bg-teal-600 text-white hover:opacity-90`}
            >
              SAVE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
