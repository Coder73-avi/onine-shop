import Breadcrumbs from "components/Breadcrumbs";
import ProductDetails from "components/ProductDetails";
import Head from "next/head";
import React from "react";
import axios from "controllers/axios";
import NewProductList from "components/HomePage/NewProductList";

const Productdetails = ({ product, topSelling, onSaleProducts, banner }) => {
  return (
    <>
      <Head>
        <title>{product?.title || "Product Details"}</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[
            { name: "Shop", path: "/shop" },
            {
              name: product?.title || "Product Details",
              path: "/productdetails/" + product?.title?.replaceAll(" ", "-"),
            },
          ]}
        />
        <ProductDetails data={product} topSelling={topSelling} />
        <NewProductList onSaleProducts={onSaleProducts} banner={banner} />
      </main>
    </>
  );
};

export default Productdetails;

export async function getStaticPaths() {
  const res = await axios.get("/getproducts");

  const paths = res.data?.newData?.map((curElement) => {
    return {
      params: { title: curElement.title.toString().replaceAll(" ", "-") },
    };
  });
  // console.log(paths);
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
export const getStaticProps = async ({ params }) => {
  try {
    const { title } = params;
    const res = await axios.get(`/getproduct/title/${title}`);
    const topSelling = await axios.get("/topsellingproduct");
    const onSale = await axios.get("/getonsaleproducts");
    const banner = await axios.get("/getbanners/on_sale");

    const { host, url, originalname } = banner.data;
    const src = host + url;
    const alt = originalname;
    // console.log(reviews.data);

    return {
      props: {
        product: res.data,
        topSelling: topSelling.data,
        onSaleProducts: onSale.data,
        banner: { src, alt },
      },
      revalidate: 60 * 10,
    };
  } catch (error) {
    console.log(error);
    return { props: { product: [], topSelling: [], onSaleProducts: [] } };
  }
};
