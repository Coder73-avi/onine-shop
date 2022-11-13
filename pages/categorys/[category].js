import Breadcrumbs from "components/Breadcrumbs";
import ShopCard from "components/ShopCard";
import { sameSiteAxios } from "controllers/axios";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Category({ products }) {
  const router = useRouter();
  const categoryName = router.query.category;
  return (
    <>
      <Head>
        <title>{router.query.category}</title>
      </Head>
      <Breadcrumbs
        location={[
          { name: "Categorys", path: "/categorys" },
          { name: categoryName, path: `/categorys/${categoryName}` },
        ]}
      />
      {products?.length == 0 ? (
        <div className="text-sm text-gray-600 my-3 mx-4 p-4 border rounded-md ">
          {categoryName.toUpperCase()} is not available !!!
        </div>
      ) : null}
      <main>
        <div className="w-[90%] mx-auto mt-4 mb-10 columns-2 lg:columns-3 gap-4 ">
          {products?.map((val, indx) => (
            <div className="mb-8" key={indx}>
              <ShopCard
                imageSrc={val?.imageSrc}
                id={val?.pid}
                title={val?.title}
                price={val?.price}
                onSale={val?.on__sale}
                isNew={val.is__new}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (req) => {
  try {
    const { category } = req.params;
    const newCategory = category.toLowerCase().replace("-", " ");
    const res = await sameSiteAxios.get(
      `/getproductsbycategory/${newCategory}`
    );
    if (res.status == 200) return { props: { products: res.data } };
    return { props: { products: [] } };
  } catch (error) {
    return { props: { products: [] } };
  }
};
