import React from "react";
import Head from "next/head";
import Breadcrumbs from "components/Breadcrumbs";
import ShopCard from "components/ShopCard";
import CategoryList from "components/CategoryList";
import { useRouter } from "next/router";
import axios from "controllers/axios";
// import axios from "axios";

import product1 from "images/home/another.jpg";
import Pagination from "components/Pagination";

const Shop = ({ products, noOfPage, categorys }) => {
  const router = useRouter();
  const [categoryData, setCategoryData] = React.useState("");

  React.useEffect(() => {
    if (router.query.hasOwnProperty("category")) {
      setCategoryData(router.query.category);
    }

    if (noOfPage == 0) router.push("/shop");
  }, [noOfPage, router, router.query]);

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <main>
        <Breadcrumbs location={[{ name: "Shop", path: "/shop" }]} />

        {/* <DefaultImage src={productsList[0].imgSrc} alt="images" /> */}
        <CategoryList categorys={categorys} />
        <div className="w-[90%] mx-auto mt-4 mb-10 md:columns-3 lg:columns-3 gap-4 ">
          {products
            ?.filter((val) => {
              if (categoryData == "" || categoryData == "all") {
                return val;
              } else if (
                categoryData.toLowerCase() ==
                val.category.toLowerCase().replace(" ", "-")
              ) {
                return val;
              }
            })
            ?.map(
              (
                { id, title, price, imageSrc, newProduct, saleStatus },
                indx
              ) => (
                <div className="mb-8" key={indx}>
                  <ShopCard
                    imageSrc={`${imageSrc[0]}` || product1}
                    id={id}
                    title={title}
                    price={price}
                    newProduct={newProduct}
                    saleStatus={saleStatus}
                  />
                </div>
              )
            )}
        </div>

        <Pagination noOfPage={noOfPage} />
      </main>
    </>
  );
};

export default Shop;

export async function getServerSideProps(context) {
  try {
    const url = process.env.URL;
    let res;

    if (context.query.hasOwnProperty("page")) {
      res = await axios.get("/getproducts/" + context.query.page);
    } else {
      res = await axios.get("/getproducts");
    }

    const { getData, paginationNum } = res.data;
    const newArr = [];

    for (let i = 0; i < getData.length; i++) {
      const images = await axios.get("/getproductimages/" + getData[i].id);
      if (images.data.length !== 0) {
        const imagesSrc = images.data?.map(
          (val) => (val.url = url + "/" + val.url)
        );
        getData[i].imageSrc = imagesSrc;
      } else {
        getData[i].imageSrc = [];
      }
      newArr.push(getData[i]);
    }

    const categoryReq = await axios.get("/categorys");
    const categorys = categoryReq?.data?.map((val) => {
      val.name = val.name;
      // val.alt = val.imagesrc.replace("categorysbg/", " ");
      val.imagesrc = url + "/" + val.imagesrc;
      if (val.imagesrc == url + "/") val.imagesrc = "";
      val.searchtag = val.searchtag;
      return val;
    });
    // console.log(categorys);
    return {
      props: {
        products: newArr,
        noOfPage: paginationNum,
        categorys,
      },
    };
  } catch (err) {
    return {
      props: { product: [], noOfPage: 0, categorys: [] },
    };
  }
}
