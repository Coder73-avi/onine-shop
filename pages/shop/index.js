import React from "react";
import Head from "next/head";
import Breadcrumbs from "components/Breadcrumbs";
import ShopCard from "components/ShopCard";
import CategoryList from "components/CategoryList";
import { useRouter } from "next/router";
import axios from "controllers/axios";

import Pagination from "components/Pagination";

const Shop = ({ products, noOfPage, categorys }) => {
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

        <CategoryList categorys={categorys} />
        <div
          className={
            "w-[90%] mx-auto mt-4 mb-10 columns-2 lg:columns-3 gap-4 custom-container"
          }
        >
          {products?.map((val, indx) => (
            <div className="mb-8" key={indx}>
              <ShopCard
                imageSrc={val?.imageSrc}
                id={val?.pid}
                title={val?.title}
                price={val?.price}
                onSale={val?.on__sale}
                isNew={val?.is__new}
              />
            </div>
          ))}
        </div>

        <Pagination noOfPage={noOfPage} link={"/shop/"} />
      </main>
    </>
  );
};

export default Shop;

export async function getStaticProps() {
  try {
    const res = await axios.get("/getproducts/20/1");

    const { getData, paginationNum } = res.data;

    return {
      props: {
        revalid: 8400,
        products: getData,
        noOfPage: paginationNum,
        categorys: [],
      },
    };
  } catch (err) {
    return {
      props: { product: [], noOfPage: 0, categorys: [] },
    };
  }
}
