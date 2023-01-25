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

const NO_OF_PAGES = 20;

export async function getStaticPaths() {
  const res = await axios.get("/getproducts/" + NO_OF_PAGES);
  const noOfPages = res.data?.paginationNum;

  const paths = [];
  for (let i = 0; i < noOfPages; i++) {
    const page = i + 1;
    paths.push({ params: { pagenumber: page.toString() } });
  }
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  try {
    const pagenumber = context.params?.pagenumber;
    const res = await axios.get(`/getproducts/${NO_OF_PAGES}/` + pagenumber);
    const { newData, paginationNum } = res.data;
    // console.log(res.data);
    return {
      props: {
        revalidate: 60 * 10,
        products: newData,
        noOfPage: paginationNum,
      },
    };
  } catch (error) {
    // console.log(error);
    return {
      props: { noOfPage: 0, products: [] },
    };
  }
}
