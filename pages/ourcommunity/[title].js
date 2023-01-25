import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import CommunityPostDetails from "components/OurCommunity/CommunityPostDetails";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewProductList from "components/HomePage/NewProductList";

export default function Title({
  communitypost,
  banner,
  onSaleProducts,
  topSelling,
}) {
  const router = useRouter();
  const [titleName, setTitleName] = useState("");
  useEffect(() => {
    const { title } = router.query;
    setTitleName(title.replaceAll("_", " "));
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{titleName}</title>
      </Head>
      <main>
        <Breadcrumbs
          location={[
            { name: "Our community", path: "/ourcommunity" },
            {
              name: titleName,
              path: "/ourcommunity/" + titleName,
            },
          ]}
        />

        <CommunityPostDetails data={communitypost} topSelling={topSelling} />
        <NewProductList onSaleProducts={onSaleProducts} banner={banner} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("/getcommunitypost/user");
  const paths = res.data?.map((curElement) => {
    return {
      params: { title: curElement.title.toString().replaceAll(" ", "-") },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const { title } = params;
    const res = await axios.get(
      "/getcommunitypostbytbname/title/" + title.replaceAll("-", " "),
    );
    const topSelling = await axios.get("/topsellingproduct");
    const onSale = await axios.get("/getonsaleproducts");
    const banner = await axios.get("/getbanners/on_sale");

    const { host, url, originalname } = banner.data;
    const src = host + url;
    const alt = originalname;
    return {
      props: {
        communitypost: res.data[0],
        onSaleProducts: onSale.data,
        topSelling: topSelling.data,
        banner: { src, alt },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        communitypost: [],
        onSaleProducts: [],
        topSelling: [],
        banner: {},
      },
    };
  }
}
