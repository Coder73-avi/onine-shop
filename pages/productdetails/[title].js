import Breadcrumbs from "components/Breadcrumbs";
import ProductDetails from "components/ProductDetails";
import Head from "next/head";
import React from "react";
import axios from "controllers/axios";
import NewProductList from "components/HomePage/NewProductList";

const Productdetails = ({ product, topSelling, onSaleProducts }) => {
  return (
    <>
      <Head>
        <title>{product?.title||"Product Details"}</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[
            { name: "Shop", path: "/shop" },
            { name:product?.title || "Product Details", path:  "/productdetails/"+product?.title.replaceAll(" ", "_") },
          ]}
        />
        <ProductDetails data={product} topSelling={topSelling} />
        <NewProductList onSaleProducts={onSaleProducts} />
      </main>
    </>
  );
};

export default Productdetails;

export async function getStaticPaths() {
  const res = await axios.get("/getproducts");

  const paths = res.data?.getData?.map((curElement) => {
    return { params: { title: curElement.title.toString().replaceAll(" ", "_")} };
  });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
export const getStaticProps = async ({params}) => {
  try {
    const { title } = params;
    const res = await axios.get(`/getproduct/title/${title.replaceAll("_", " ")}`);
    const topSelling = await axios.get("/topsellingproduct");
    const onSale = await axios.get("/getonsaleproducts");

    // console.log(reviews.data);

    return {
      props: {
        revalidate: 60 * 10,
        product: res.data[0],
        topSelling: topSelling.data,
        onSaleProducts: onSale.data,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { product: [], topSelling: [], onSaleProducts: [] } };
  }
};
