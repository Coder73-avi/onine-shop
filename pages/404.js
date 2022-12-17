import Breadcrumbs from "components/Breadcrumbs";
import DefaultImage from "components/DefaultImage";
import NewProductList from "components/HomePage/NewProductList";
import pagenotfound from "images/404.webp";
import Link from "next/link";
import axios from "controllers/axios";

export default function fourofour({ onSaleProducts }) {
  return (
    <>
      <Breadcrumbs location={[{ name: "404", path: "/" }]} />
      <section className="flex flex-col justify-center items-center h-[100%] gap-3 mb-4">
        <div className="relative md:h-[40vh] lg:h-[50vh] w-[40vw]">
          <DefaultImage src={pagenotfound} alt="404, page-not-found" />
        </div>
        <div className="text-3xl uppercase font-bold">OPPS! PAGE NOT FOUND</div>
        <Link href={"/"}>
          <button className="uppercase bg-gray-800 hover:bg-gray-900 text-white font-bold cursor-pointer px-6 py-3 md:w-[30%] lg:w-[20%] rounded-sm">
            Go to Home Page
          </button>
        </Link>
      </section>
      <NewProductList onSaleProducts={onSaleProducts} />
    </>
  );
}

export async function getStaticProps() {
  try {
    const onSale = await axios.get("/getonsaleproducts");

    return { props: { onSaleProducts: onSale.data, revalidate: 60 * 20 } };
  } catch (error) {
    return { props: { onSaleProducts: [] } };
  }
}
