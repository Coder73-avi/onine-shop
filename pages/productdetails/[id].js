import Breadcrumbs from "components/Breadcrumbs";
import ProductDetails from "components/ProductDetails";
import Head from "next/head";
import React from "react";
import axios from "controllers/axios";
import NewProductList from "components/HomePage/NewProductList";

const Productdetails = ({ product }) => {
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
        <ProductDetails data={product[0]} />
        <NewProductList />
      </main>
    </>
  );
};

export default Productdetails;

export async function getStaticPaths() {
  const res = await axios.get("/getproducts");
  const paths = res.data?.getData?.map((curElement) => {
    return { params: { id: curElement.id.toString() } };
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
export const getStaticProps = async (context) => {
  const { id } = context.params;
  const url = process.env.URL;
  const res = await axios.get("/getproduct/" + id);
  let newData = [];

  if (res.data?.length !== 0) {
    newData = res.data;
    const images = await axios.get("/getproductimages/" + id);
    if (images.data.length !== 0) {
      const imagesSrc = images.data?.map(
        (val) => (val.url = url + "/" + val.url)
      );
      newData[0].imageSrc = imagesSrc;
    } else {
      newData[0].imageSrc = [];
    }
  }

  return { props: { product: newData } };
};
