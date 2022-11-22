import Breadcrumbs from "components/Breadcrumbs";
import CategoryList from "components/CategoryList";
import Pagination from "components/Pagination";
import ShopCard from "components/ShopCard";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "controllers/axios";

export default function Pagenumber({ products, noOfPage, categorys }) {
  const router = useRouter();
  const pageNumber = router.query.pagenumber;
  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[{ name: "Shop", path: "/shop/" + pageNumber }]}
        />

        <CategoryList categorys={categorys} />
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

        <Pagination noOfPage={noOfPage} link="/shop/" />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("/getproducts/20");
  const noOfPages = res.data?.paginationNum;
  const paths = Array(noOfPages)
    .fill()
    .map((curElement, indx) => {
      const page = indx + 1;

      return { params: { pagenumber: page.toString() } };
    });
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  try {
    const { pagenumber } = context.params;
    const res = await axios.get("/getproducts/20/" + pagenumber);
    const { getData, paginationNum } = res.data;

    return {
      props: {
        revalidate: 60 * 20,
        products: getData,
        noOfPage: paginationNum,
        categorys: [],
      },
    };
  } catch (error) {
    return {
      props: { product: [], noOfPage: 0, categorys: [] },
    };
  }
}
