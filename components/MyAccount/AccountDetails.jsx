import Loading from "components/Loading";
import { useStateValue } from "controllers/Reducer/stateProvider";
import React, { useEffect, useState } from "react";

import AccountDetailsForm from "./AccountDetailsForm";
import UserSocialLogin from "./UserSocialLogin";

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
      {loading ? <Loading /> : null}

      {user?.type == "normal" ? (
        <UserSocialLogin user={user} />
      ) : (
        <AccountDetailsForm setLoading={setLoading} />
      )}
    </>
  );
};

export default AccountDetails;
