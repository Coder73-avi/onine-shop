import Breadcrumbs from "components/Breadcrumbs";
import WhishList from "components/WishList";
import Head from "next/head";
import React from "react";

const Wishlist = () => {
  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>
      <Breadcrumbs location={[{ name: "Wish List", path: "/wishlist" }]} />
      <WhishList />
    </>
  );
};

export default Wishlist;
