import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "controllers/axios";
import css from "./css/style.module.css";
import { AiOutlineDashboard, AiOutlineCloudDownload } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { MdPayment, MdOutlineReviews } from "react-icons/md";
import { ImLocation } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import Myorders from "./Myorders";
import PaymentMethod from "./PaymentMethod";
import Address from "./Address";
import AccountDetails from "./AccountDetails";
import Dashboard from "./Dashboard";
import MyReview from "./MyReview";

const MyAccount = ({ router }) => {
  const myaccount = [
    { name: "Dashboard", path: "/myaccount", icon: <AiOutlineDashboard /> },
    {
      name: "My Orders",
      path: "/myaccount?name=my-orders",
      icon: <BsCartCheck />,
    },
    {
      name: "My Review",
      path: "/myaccount?name=my-review",
      icon: <MdOutlineReviews />,
    },
    {
      name: "Downloads",
      path: "/myaccount?name=downloads",
      icon: <AiOutlineCloudDownload />,
    },
    {
      name: "Payment Method",
      path: "/myaccount?name=payment-method",
      icon: <MdPayment />,
    },
    { name: "Address", path: "/myaccount?name=address", icon: <ImLocation /> },
    {
      name: "Account Details",
      path: "/myaccount?name=account-details",
      icon: <FaUserAlt />,
    },
  ];
  const [path, setPath] = useState("");

  useEffect(() => {
    if (router.query.hasOwnProperty("name")) {
      setPath(router.query.name);
    } else {
      setPath("");
    }
  }, [router.query]);

  return (
    <>
      <div className="my-5 grid grid-cols-4 gap-5 lg:gap-10 custom-container">
        <div className="col-span-4 md:col-span-1 border">
          <nav className={css.myaccount__nav + " "}>
            {myaccount?.map((val, indx) => {
              let active = false;
              const url = val.name.toLowerCase().replace(" ", "-");
              if (url == path) active = true;
              if (!router.query.hasOwnProperty("name")) {
                if (url == "dashboard") active = true;
              }

              return (
                <Link href={val.path} key={indx}>
                  <a
                    className={`text-gray-800 ${css.nav__name} ${
                      active && css.active
                    }`}
                  >
                    <span className={css.icon}>{val.icon}</span>

                    <span>{val.name}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="col-span-4 md:col-span-3 ">
          <div className="border p-4 min-h-full">
            {!router.query.hasOwnProperty("name") && <Dashboard />}
            {router.query?.name == "my-orders" && <Myorders />}
            {router.query?.name == "my-review" && <MyReview />}
            {router.query?.name == "downloads" && <Myorders />}
            {router.query?.name == "payment-method" && <PaymentMethod />}
            {router.query?.name == "address" && <Address />}
            {router.query?.name == "account-details" && <AccountDetails />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
