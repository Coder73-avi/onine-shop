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
        // console.log(carts.length);

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
  }, [user, router]);

  useEffect(() => {
    if (carts.length == 0) router.push("/shop");
    if (user !== null) checkOutList();
  }, [carts.length, checkOutList, router, user]);

  return (
    <section className="w-[97%] lg:w-[90%] mx-auto my-4">
      <h1 className="font-bold uppercase text-xl py-2">PROCCED TO CHECKOUT</h1>
      <hr className="mb-4" />

      <div className={css.alertInfo}>
        Check your Product before place to order
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-5 gap-10">
          <div className="col-span-5 md:col-span-3">
            <OrderDetails carts={carts} />
          </div>
          <div className="col-span-5 md:col-span-2">
            <BillingAddress address={address} />
            <br />
            <OrderSummary
              carts={carts}
              dispatch={dispatch}
              address__id={address?.id}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckOut;
