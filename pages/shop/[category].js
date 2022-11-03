import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import ShopCard from "components/ShopCard";
import Head from "next/head";
import Link from "next/link";
import NewProductList from "components/HomePage/NewProductList";

export default function categoryName({ categoryname, products }) {
  return (
    <>
      <Head>{categoryname}</Head>
      <main>
        <Breadcrumbs
          location={[
            { name: "Shop", path: "/shop" },
            { name: categoryname, path: "/shop/" + categoryName },
          ]}
        />
        {products.length == 0 && (
          <div className="text-sm text-gray-500 pb-4 capitalize px-8 py-4 border-b">
            0 {categoryname} found.{" "}
            <Link href="/shop">
              <a className="text-blue-600">Shop Now</a>
            </Link>
          </div>
        )}
        {/* <DefaultImage src={productsList[0].imgSrc} alt="images" /> */}
        <div className="w-[90%] mx-auto mt-4 mb-10 md:columns-3 lg:columns-3 gap-4 ">
          {products?.map(
            ({ id, title, price, imageSrc, newProduct, saleStatus }, indx) => (
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

        <NewProductList />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const url = process.env.URL;
    const { category } = context.params;
    const req = await axios.get("/getproductsbycategory/" + category);
    const getData = req.data;
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

    return { props: { categoryname: category, products: newArr } };
  } catch (error) {
    console.log(error);
    return { props: { categoryname: context.params.category, products: [] } };
  }
}
