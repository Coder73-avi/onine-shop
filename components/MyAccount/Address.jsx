import React, { useCallback, useEffect, useState } from "react";
import css from "./css/address.module.css";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import AddressForm from "./AddressForm";
import axios from "controllers/axios";
import { useStateValue } from "controllers/Reducer/stateProvider";

import { BsHandbagFill } from "react-icons/bs";
import { AiTwotoneHome } from "react-icons/ai";
import Loading from "components/Loading";

const Address = () => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const [ranNum, setRanNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addressData, setAddressData] = useState([]);

  const getBillingAdress = useCallback(async () => {
    try {
      if (user == null) return;
      const res = await axios.get("/getbillingaddress/" + user.id);
      if (res.status == 200) {
        setAddressData(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [user, router.query, ranNum]);
  useEffect(() => {
    getBillingAdress();
  }, [getBillingAdress]);

  useEffect(() => {
    if (router.query?.form !== "update") setLoading(false);
  }, [router.query?.form]);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-extrabold my-2">My Billing Address</h1>
        <Link href="/myaccount?name=address&&form=new">
          <button className={css.addNewBtn}>Add New</button>
        </Link>
      </div>
      <hr className="my-2" />
      {loading && <Loading />}
      {!loading && addressData?.length == 0 && router.query?.form !== "new" && (
        <div className="text-sm text-gray-600">
          Billing addres is not found. You must add new Address.{" "}
          <Link href={"/myaccount?name=address&&form=new"}>
            <a className="text-blue-700 hover:underline">Add new</a>
          </Link>
        </div>
      )}
      <section>
        {router.query?.form == undefined ? (
          <div className="grid lg:grid-cols-2 gap-6 items-center my-6 mx-4">
            {addressData?.map((val, indx) => {
              return (
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
              );
            })}
          </div>
        ) : (
          <AddressForm setLoading={setLoading} />
        )}
      </section>
    </>
  );
};

export default Address;

export const AddressCard = ({
  id,
  setRanNum,
  fullname,
  address,
  region,
  city,
  street,
  area,
  deliveryat,
  phonenumber,
  active,
}) => {
  const activeAddress = async () => {
    try {
      const update = await axios.patch("/activebillingaddress/" + id);
      if (update.status == 200) {
        setRanNum(Math.random());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-sm border p-5 rounded-md shadow ">
      <h3 className="font-semibold text-gray-700  mb-4 capitalize">
        {fullname}
      </h3>
      <div className="text-gray-500 mb-4">
        {address || `1355 Market St`}, <br />
        {`${region} ${city} ${street}, ${area}` ||
          `Suite 900 San Francisco, CA 94103`}
      </div>
      <div className="text-gray-500 ">
        Mobile: {phonenumber || `(123) 456-7890`}
      </div>
      <div className="flex flex-row justify-end items-center my-1">
        <button
          type="button"
          className={`flex flex-row justify-center items-center gap-4 py-3 px-4 text-sm font-mono  border  rounded-md shadow  ${
            deliveryat.toLowerCase() == "office"
              ? "border-teal-300 text-teal-600"
              : "border-orange-300 text-orange-600"
          }`}
        >
          {deliveryat.toLowerCase() == "office" ? (
            <BsHandbagFill />
          ) : (
            <AiTwotoneHome />
          )}
          <span className="capitalize">{deliveryat}</span>
        </button>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <Link href={`/myaccount?name=address&&form=update&&id=${id}`}>
          <button className={css.edit__address}>
            <FiEdit /> Edit Address
          </button>
        </Link>

        <button
          className={css.edit__address}
          disabled={active ? true : false}
          onClick={activeAddress}
        >
          Active
        </button>
      </div>
    </div>
  );
};
