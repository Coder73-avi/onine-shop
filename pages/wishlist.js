import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import NewProductList from "components/HomePage/NewProductList";
import WhishList from "components/WishList";
import Head from "next/head";
import React from "react";

const Wishlist = ({ onSaleProducts }) => {
  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>
      <Breadcrumbs location={[{ name: "Wish List", path: "/wishlist" }]} />
      <WhishList />
      <NewProductList onSaleProducts={onSaleProducts} />
    </>
  );
};

export default Wishlist;

export async function getStaticProps() {
  try {
    const onSale = await axios.get("/getonsaleproducts");

    return { props: { onSaleProducts: onSale.data, revalidate: 60 * 20 } };
  } catch (error) {
    return { props: { onSaleProducts: [] } };
  }
}
