import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import NewProductList from "components/HomePage/NewProductList";
import WhishList from "components/WishList";
import Head from "next/head";
import React from "react";

const Wishlist = ({ onSaleProducts, banner }) => {
  return (
    <>
      <Head>
        <title>Wishlist</title>
      </Head>
      <Breadcrumbs location={[{ name: "Wish List", path: "/wishlist" }]} />
      <WhishList />
      <NewProductList onSaleProducts={onSaleProducts} banner={banner} />
    </>
  );
};

export default Wishlist;

export async function getStaticProps() {
  try {
    const onSale = await axios.get("/getonsaleproducts");
    const banner = await axios.get("/getbanners/on_sale");
    
    const { host, originalname, url } = banner.data;
    const src = host + url;
    const alt = originalname;

    return {
      props: { onSaleProducts: onSale.data, banner: { src, alt } },
      revalidate: 60 * 10,
    };
  } catch (error) {
    return { props: { onSaleProducts: [], banner: {} } };
  }
}
