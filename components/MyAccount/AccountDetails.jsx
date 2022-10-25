import { useStateValue } from "controllers/Reducer/stateProvider";
import React, { useEffect, useState } from "react";

import AccountDetailsForm from "./AccountDetailsForm";

const AccountDetails = () => {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    user !== null ? setLoading(false) : setLoading(true);
  }, [user]);
  return (
    <>
      <h1 className="text-lg font-extrabold uppercase my-2 text-gray-800">
        My Account Details
      </h1>
      <hr className="mb-4" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AccountDetailsForm setLoading={setLoading} />
      )}
    </>
  );
};

export default AccountDetails;
