import React from "react";
import css from "./css/address.module.css";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import AddressForm from "./AddressForm";

const Address = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-extrabold my-2">My Billing Address</h1>
        <Link href="/myaccount?name=address&&form=new">
          <button className={css.addNewBtn}>Add New</button>
        </Link>
      </div>
      <hr className="my-2" />
      {router.query?.form == undefined ? (
        <div className="text-sm ">
          <h3 className="font-semibold text-gray-700  mb-4">Alex Tuntuni</h3>
          <div className="text-gray-500 mb-4">
            1355 Market St, <br />
            Suite 900 San Francisco, CA 94103
          </div>
          <div className="text-gray-500">Mobile: (123) 456-7890</div>
          <Link href="/myaccount?name=address&&form=update">
            <button className={css.edit__address}>
              <FiEdit /> Edit Address
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <AddressForm />
        </div>
      )}
    </>
  );
};

export default Address;
