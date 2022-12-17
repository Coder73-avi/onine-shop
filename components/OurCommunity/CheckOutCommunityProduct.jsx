import DefaultImage from "components/DefaultImage";
import { AddressCard } from "components/MyAccount/Address";
import axios from "controllers/axios";
import { formatingNumber } from "controllers/otherFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";

import css from "./css/CheckOutCommunityProduct.module.css";

const CheckOutCommunityProduct = ({ data, sendOrder, setSendOrder }) => {
  const mainRef = useRef();
  const router = useRouter();
  const [address, setAddress] = useState([]);
  const [ranNum, setRanNum] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("khalti");
  const [info, setInfo] = useState({
    title: data?.title || "",
    price: data?.price || "",
    product__id: data?.pid,
  });

  const getAddress = useCallback(async () => {
    try {
      const { user__id } = data;
      const req = await axios.get(`/getbillingaddress/${user__id}`);
      if (req.status == 200) {
        setAddress(req.data);
      }
    } catch (error) {
      return setAddress([]);
    }
  }, [data, ranNum]);

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const addPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const sendOrderToReview = async (e) => {
    try {
      const obj = { ...info, payment__method: paymentMethod };
      const send = await axios.post("/sendcommunityorder", obj);
      if (send.status == 201) {
        console.log("Send successfully.");
        setTimeout(() => {
          alert("Send successfully");
          router.push("/ourcommunity");
        }, 5000);
        return true;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <section className={css.main__container}>
      <div className={css.container}>
        <div
          className="absolute top-3 right-3 hover:text-teal-500 cursor-pointer"
          onClick={() => setSendOrder(false)}
        >
          <IoClose className="text-3xl" />
        </div>
        <h1 className="font-bold text-xl text-center mb-3">Summary Order</h1>
        <div className="border rounded-md p-3">
          <div className="grid md:grid-cols-2 gap-6">
            {address?.map((val, indx) => (
              // <div key={indx} className="text-sm border p-5 rounded-md shadow">
              //   <h3 className="font-semibold text-gray-700  mb-4 capitalize">
              //     {val?.fullname}
              //   </h3>
              //   <div className="text-gray-500 mb-4">
              //     {/* {val?.address || `1355 Market St`}, <br /> */}
              //     {`${val?.region} ${val?.city} ${val?.street}, ${val?.area}` ||
              //       `Suite 900 San Francisco, CA 94103`}
              //   </div>
              //   <div className="text-gray-500 ">
              //     Mobile: {val?.phonenumber || `(123) 456-7890`}
              //   </div>
              //   <div className="flex flex-row justify-end items-center my-3">
              //     <button
              //       type="button"
              //       className={`flex flex-row justify-center items-center gap-4 py-2 px-4 text-sm font-mono  border  rounded-md shadow  ${
              //         val?.deliveryat.toLowerCase() == "office"
              //           ? "border-teal-300 text-teal-600"
              //           : "border-orange-300 text-orange-600"
              //       }`}
              //     >
              //       {val?.deliveryat.toLowerCase() == "office" ? (
              //         <BsHandbagFill />
              //       ) : (
              //         <AiTwotoneHome />
              //       )}
              //       <span className="capitalize">{val?.deliveryat}</span>
              //     </button>
              //   </div>
              //   <div className="flex flex-row gap-3 items-center">
              //     <Link
              //       href={`/myaccount?name=address&&form=update&&id=${val?.id}`}
              //     >
              //       <button className={css.edit__address}>
              //         <FiEdit /> Edit
              //       </button>
              //     </Link>

              //     <button
              //       className={css.edit__address}
              //       disabled={val?.status == "active" ? true : false}
              //       // onClick={activeAddress}
              //     >
              //       Active
              //     </button>
              //   </div>
              // </div>
              <AddressCard
                key={indx}
                setRanNum={setRanNum}
                id={val?.id}
                fullname={val?.fullname}
                address={val?.address}
                region={val?.region}
                city={val?.city}
                street={val?.street}
                area={val?.area}
                deliveryat={val?.deliveryat}
                phonenumber={val?.phonenumber}
                active={val?.status == "active" ? true : false}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <div className="relative w-full">
              <DefaultImage src={data?.host + data?.imageSrc[0]?.url} />
            </div>
            <div className="border p-4 rounded-md min-h-[250px]">
              <form className="relative h-full">
                <h2 className="text-base font-bold text-teal-800">Details :</h2>
                <div className="font-bold text-sm">{data?.title}</div>
                <div className="font-bold my-3">
                  Rs. {formatingNumber(data?.price)}
                </div>
                <div className="">
                  <div className={css.payMethod}>
                    <input
                      type="radio"
                      name="payment__method"
                      id="khalti"
                      value="khalti"
                      checked={paymentMethod == "khalti" ? true : false}
                      onChange={addPaymentMethod}
                    />{" "}
                    <label htmlFor="khalti">Pay with Khalti</label>
                  </div>
                  <div className={css.payMethod}>
                    <input
                      type="radio"
                      name="payment__method"
                      id="esewa"
                      value="esewa"
                      checked={paymentMethod == "esewa" ? true : false}
                      onChange={addPaymentMethod}
                    />
                    <label htmlFor="esewa">Pay with esewa</label>
                  </div>
                </div>
                <button
                  type="button"
                  className={css.payBtn}
                  onClick={sendOrderToReview}
                  style={{
                    backgroundColor: `${
                      paymentMethod == "esewa" ? "" : "blueviolet"
                    }`,
                  }}
                >
                  Pay With {paymentMethod}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutCommunityProduct;
