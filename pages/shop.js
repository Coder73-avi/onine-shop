import React from "react";
import Head from "next/head";
import Breadcrumbs from "components/Breadcrumbs";
import ShopCard from "components/ShopCard";
import { productsList } from "controllers/productsList";
import { useStateValue } from "controllers/Reducer/stateProvider";
import DefaultImage from "components/DefaultImage";
import CategoryList from "components/CategoryList";
import { useRouter } from "next/router";
// import axios from "controllers/axios";
import axios from "axios";

import product1 from "images/home/another.jpg";

const Shop = ({ products }) => {
  const router = useRouter();
  const [categoryData, setCategoryData] = React.useState("");
  const [{ cart }, dispatch] = useStateValue();

  React.useEffect(() => {
    if (router.query.hasOwnProperty("category")) {
      setCategoryData(router.query.category);
    }
  }, [router.query]);

  console.log(process.env.URL);
  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <main>
        <Breadcrumbs location={[{ name: "Shop", path: "/shop" }]} />

        {/* <DefaultImage src={productsList[0].imgSrc} alt="images" /> */}
        <CategoryList />
        <div className="w-[90%] mx-auto mt-4 mb-10 md:columns-3 lg:columns-3 gap-4 ">
          {products
            .filter((val) => {
              if (categoryData == "" || categoryData == "all") {
                return val;
              } else if (
                categoryData.toLowerCase() ==
                val.category.toLowerCase().replace(" ", "-")
              ) {
                return val;
              }
            })
            .map(
              (
                { id, title, price, imageSrc, newProduct, saleStatus },
                indx
              ) => (
                <div className="mb-8" key={indx}>
                  <ShopCard
                    imageSrc={product1}
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
      </main>
    </>
  );
};

export default Shop;

export async function getServerSideProps() {
  const res = await axios.get(
    "https://www.online-shop-api001.herokuapp.com/getproducts"
  );
  const data = res.data;
  // const newArr = [];
  // for (let i = 0; i < data.length; i++) {
  //   const images = await axios.get(
  //     "https://online-shop-api001.herokuapp.com/getproductimages/" + data[i].id
  //   );
  //   data[i].imageSrc = images.data;
  //   newArr.push(data[i]);
  // }
  return { props: { products: data } };
}
