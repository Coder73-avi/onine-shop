import Breadcrumbs from "components/Breadcrumbs";
import ShopCard from "components/ShopCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "controllers/axios";
import NewProductList from "components/HomePage/NewProductList";

export default function Search({ products }) {
  const router = useRouter();
  const [keywords, setKeywords] = useState("");
  useEffect(() => {
    const search = router.query.keywords;
    setKeywords(search);
  }, [router.query.keywords]);
  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[
            { name: "Search", path: "/search" },
            { name: keywords, path: keywords },
          ]}
        />

        <div
          className={
            "w-[90%] mx-auto my-4 mb-10 columns-2 lg:columns-3 gap-4 custom-container"
          }
        >
          {products.length == 0 ? (
            <div className="text-sm py-2 text-gray-600">
              {" "}
              0 product found !!
            </div>
          ) : null}
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

        <NewProductList />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { keywords } = context.params;
    const res = await axios.get("/searchproducts/" + keywords);
    return { props: { products: res.data } };
  } catch (error) {
    return { props: { products: [] } };
  }
}
