import { useStateValue } from "controllers/Reducer/stateProvider";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import BillingAddress from "./BillingAddress";
import css from "./css/style.module.css";
import OrderSummary from "./OrderSummary";
import OrderDetails from "./OrderDetails";
import axios from "controllers/axios";
import { useRouter } from "next/router";
import Loading from "components/Loading";

const CheckOut = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [{ user, cartChange, carts }, dispatch] = useStateValue();
  const [address, setAddress] = useState([]);

  const checkOutList = useCallback(async () => {
    try {
      if (user !== null) {
        console.log(carts.length);

        const getAddress = await axios.get("/getactivebillingaddress");

        if (getAddress.status !== 200)
          return alert("something wrong with server");

        if (getAddress.data?.length == 0)
          return router.push("myaccount?name=address&&form=new");

        setAddress(getAddress.data[0]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, cartChange]);

  useEffect(() => {
    if (carts.length == 0) router.push("/shop");
    if (user !== null) checkOutList();
  }, [checkOutList, user]);

  return (
    <section className="w-[90%] mx-auto my-4">
      <h1 className="font-bold uppercase text-xl py-2">PROCCED TO CHECKOUT</h1>
      <hr className="mb-4" />

      <div className={css.alertInfo}>
        Have a coupon?
        <Link href={"/login"}>
          <a> Click here to enter your code</a>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-5 gap-16">
          <div className="col-span-3">
            {/* <BillingForm /> */}
            <BillingAddress address={address} />
            <OrderDetails carts={carts} />
          </div>
          <div className="col-span-2">
            <OrderSummary carts={carts} dispatch={dispatch} />
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckOut;
