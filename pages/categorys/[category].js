import Breadcrumbs from "components/Breadcrumbs";
import NewProductList from "components/HomePage/NewProductList";
import ShopCard from "components/ShopCard";
import axios, { sameSiteAxios } from "controllers/axios";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Category({ products, onSaleProducts, banner }) {
  const router = useRouter();
  const categoryName = router.query.category;
  return (
    <>
      <Head>
        <title>{router.query.category?.toUpperCase()}</title>
      </Head>
      <Breadcrumbs
        location={[
          { name: "Categorys", path: "/categorys" },
          { name: categoryName, path: `/categorys/${categoryName}` },
        ]}
      />
      {products?.length == 0 ? (
        <div className="text-sm text-gray-600 my-3 mx-4 p-4 border rounded-md ">
          <span className="capitalize">{categoryName}</span> is not available
          !!!
        </div>
      ) : null}
      <main>
        <div className="w-[90%] mx-auto mt-4 mb-10 columns-2 lg:columns-3 gap-4 ">
          {products?.map((val, indx) => (
            <div className="mb-8" key={indx}>
              <ShopCard data={val} />
            </div>
          ))}
        </div>

        <NewProductList onSaleProducts={onSaleProducts} banner={banner} />
      </main>
    </>
  );
}

export const getServerSideProps = async (req) => {
  try {
    const { category } = req.params;
    const newCategory = category.toLowerCase().replace("-", " ");
    const res = await sameSiteAxios.get(
      `/getproductsbycategory/${newCategory}`,
    );
    const banner = await axios.get("/getbanners/on_sale");
    const onSale = await sameSiteAxios.get("/getonsaleproducts");

    const { host, url, originalname } = banner.data;
    const src = host + url;
    const alt = originalname;
    return {
      props: {
        products: res.data,
        onSaleProducts: onSale.data,
        banner: { src, alt },
      },
    };
  } catch (error) {
    return { props: { products: [], onSaleProducts: [], banner: {} } };
  }
};
