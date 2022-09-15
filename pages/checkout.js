import Breadcrumbs from "components/Breadcrumbs";
import CheckOut from "components/CheckOut";
import Head from "next/head";
import React from "react";

const Checkout = () => {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Breadcrumbs location={[{ name: "Checkout", path: "/checkout" }]} />
      <CheckOut />
    </>
  );
};

export default Checkout;
