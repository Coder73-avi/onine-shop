import Breadcrumbs from "components/Breadcrumbs";
import ProductDetails from "components/ProductDetails";
import Head from "next/head";
import React from "react";
import axios from "controllers/axios";
import NewProductList from "components/HomePage/NewProductList";

const Productdetails = ({ product, topSelling }) => {
  return (
    <>
      <Head>
        <title>Product Details</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[
            { name: "Shop", path: "/shop" },
            { name: "Product Details", path: "/productdetails" },
          ]}
        />
        <ProductDetails data={product} topSelling={topSelling} />
        <NewProductList />
      </main>
    </>
  );
};

export default Productdetails;

export async function getStaticPaths() {
  const res = await axios.get("/getproducts");
  const paths = res.data?.getData?.map((curElement) => {
    return { params: { pid: curElement.pid.toString() } };
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
export const getStaticProps = async (context) => {
  try {
    const { pid } = context.params;
    const res = await axios.get("/getproduct/" + pid);
    const topSelling = await axios.get("/topsellingproduct");
    // console.log(res.data);

    return {
      props: {
        revalid: 8400,
        product: res.data[0],
        topSelling: topSelling.data,
      },
    };
  } catch (error) {
    // console.log(error);
    return { props: { product: [], topSelling: [] } };
  }
};