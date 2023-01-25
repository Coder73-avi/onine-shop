import React from "react";
import Head from "next/head";
import Breadcrumbs from "components/Breadcrumbs";
import ShopCard from "components/ShopCard";
import { useRouter } from "next/router";
import axios from "controllers/axios";

import Pagination from "components/Pagination";

const Shop = ({ products, noOfPage }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (noOfPage == 0) router.push("/shop");
  }, [noOfPage, router, router.query]);

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <main>
        <Breadcrumbs location={[{ name: "Shop", path: "/shop" }]} />

        <div
          className={
            "w-[90%] mx-auto mt-4 mb-10 columns-2 lg:columns-3 gap-4 custom-container"
          }
        >
          {products?.map((val, indx) => (
            <div className="mb-8" key={indx}>
              <ShopCard data={val} />
            </div>
          ))}
        </div>

        <Pagination noOfPage={noOfPage} link={"/shop/"} />
        <br />
      </main>
    </>
  );
};

export default Shop;

export async function getStaticProps() {
  try {
    const res = await axios.get("/getproducts/20/1");

    const { newData, paginationNum } = res.data;
    return {
      props: {
        revalid: 60 * 10,
        products: newData,
        noOfPage: paginationNum,
      },
    };
  } catch (err) {
    // console.log(err);
    return {
      props: {
        product: [],
        onSaleProducts: [],
        noOfPage: 0,
        onSaleProducts: [],
      },
    };
  }
}
