import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import CheckOut from "components/CheckOut";
import NewProductList from "components/HomePage/NewProductList";
import Head from "next/head";
import React from "react";

const Checkout = ({ banner, onSaleProducts }) => {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Breadcrumbs location={[{ name: "Checkout", path: "/checkout" }]} />
      <CheckOut />
      <NewProductList banner={banner} onSaleProducts={onSaleProducts} />
    </>
  );
};

export default Checkout;

export async function getStaticProps() {
  try {
    const onSale = await axios.get("/getonsaleproducts");
    const banner = await axios.get("/getbanners/on_sale");
    const { host, url, originalname } = banner.data;
    const src = host + url;
    return {
      props: { banner: { src, originalname }, onSaleProducts: onSale.data },
    };
  } catch (error) {
    return { props: { banner: {}, onSaleProducts: [] } };
  }
}
