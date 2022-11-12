import { useStateValue } from "controllers/Reducer/stateProvider";
import React from "react";
import axios from "controllers/axios";
import { useRouter } from "next/router";
import { RemoveCookie } from "controllers/SetCookie";

const Dashboard = () => {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();

  const logOut = async () => {
    try {
      // await axios.get("/logout");
      RemoveCookie("auth");
      alert("Log out successfully");
      dispatch({ type: "UPDATE__CART" });
      dispatch({ type: "AUTH__USER", user: null });
      dispatch({ type: "ADD__TO__CART", carts: [] });

      router.push("/login");
    } catch (error) {
      // console.error(error);
    }
  };
  return (
    <>
      <h1 className="text-lg font-extrabold uppercase my-2 text-gray-800">
        Dashboard
      </h1>
      <hr className="mb-4" />
      <p className="text-sm text-gray-700 text-justify">
        Hello,{" "}
        <b className="capitalize">
          {user?.firstname || "Alex"} {user?.lastname || "Tuntuni"}
        </b>{" "}
        (If Not <b className="capitalize">{user?.firstname || "Alex"}</b> !{" "}
        <span
          onClick={logOut}
          className="text-blue-500 font-bold cursor-pointer"
        >
          Logout
        </span>
        ) <br />
        From your account dashboard. you can easily check & view your recent
        orders, manage your shipping and billing addresses and edit your
        password and account details.
      </p>
    </>
  );
};

export default Dashboard;
