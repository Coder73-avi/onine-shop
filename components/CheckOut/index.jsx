import Link from "next/link";
import React from "react";
import BillingForm from "./BillingForm";
import css from "./css/style.module.css";
import OrderrDetails from "./OrderDetails";

const CheckOut = () => {
  return (
    <section className="w-[90%] mx-auto my-4">
      <h1 className="font-bold uppercase text-xl py-2">PROCCED TO CHECKOUT</h1>
      <hr className="mb-4" />

      <div className={css.alertInfo}>
        Returning customer?
        <Link href={"/login"}>
          <a> Click here to login</a>
        </Link>
      </div>
      <div className={css.alertInfo}>
        Have a coupon?
        <Link href={"/login"}>
          <a> Click here to enter your code</a>
        </Link>
      </div>

      {/* billing form */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <BillingForm />
        </div>
        <div>
          <OrderrDetails />
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
