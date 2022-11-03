import Breadcrumbs from "components/Breadcrumbs";
import NewProductList from "components/HomePage/NewProductList";
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
      <NewProductList />
    </>
  );
};

export default Wishlist;
