import React from "react";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-lg font-extrabold uppercase my-2 text-gray-800">
        Dashboard
      </h1>
      <hr className="mb-4" />
      <p className="text-sm text-gray-700 text-justify">
        Hello, <b>Alex Tuntuni</b> (If Not <b>Tuntuni</b> ! <span>Logout</span>){" "}
        <br />
        From your account dashboard. you can easily check & view your recent
        orders, manage your shipping and billing addresses and edit your
        password and account details.
      </p>
    </>
  );
};

export default Dashboard;
