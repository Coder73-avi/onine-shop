import { useStateValue } from "controllers/Reducer/stateProvider";
import React, { useState } from "react";

const BillingAddress = ({ address }) => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      <div className="text-sm border p-4 rounded-md shadow-sm ">
        <h3 className="text-xs text-gray-900 ">
          Delivery to : {address?.fullname}
        </h3>
        <div className="flex flex-row  my-2 gap-2 items-center">
          <p className="px-2 py-1 bg-gray-200 rounded-md text-xs uppercase ">
            {address?.deliveryat}
          </p>
          <p className="text-xs min-w-[88px]">{address?.phonenumber}</p>
          <p className="text-xs border-l px-2">
            {`${address?.address} ${address?.street} ${address?.area} ${address?.colony} ${address?.city} ${address?.region}` ||
              `Pargati Nagar Road, Raeela production, Shankhamul Area, Kathmandu
            Metro 10 - New Baneshwor Area, Bagmati Province`}
          </p>
          <p className="text-xs text-blue-600 cursor-pointer capitalize">
            Change
          </p>
        </div>
        <div className="flex flex-row gap-2 mt-4 mb-3">
          <p className="text-xs">Bill to the same address</p>
          <p className="text-xs text-blue-600 cursor-pointer capitalize">
            edit
          </p>
        </div>
        <div className="flex flex-row gap-2 mt-4 mb-3">
          <p className="text-xs">Email to {user?.email || `demo@gmail.com`}</p>
          <p className="text-xs text-blue-600 cursor-pointer capitalize">
            edit
          </p>
        </div>
      </div>
    </>
  );
};

export default BillingAddress;
