import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import CommunityPostDetails from "components/OurCommunity/CommunityPostDetails";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewProductList from "components/HomePage/NewProductList";

export default function Title({ communitypost, onSaleProducts, topSelling }) {
  const router = useRouter();
  const [titleName, setTitleName] = useState("");
  useEffect(() => {
    const { title } = router.query;
    setTitleName(title);
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
        <NewProductList onSaleProducts={onSaleProducts} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("/getcommunitypost/all");
  const paths = res.data?.map((curElement) => {
    return { params: { title: curElement.title.toString().replaceAll(" ", "_") } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  try {
    const { title } = params;
    const res = await axios.get(
      "/getcommunitypostbytbname/title/" + title.replaceAll("_", " ")
    );
    const topSelling = await axios.get("/topsellingproduct");
    const onSale = await axios.get("/getonsaleproducts");


    return {
      props: {
        communitypost: res.data[0],
        onSaleProducts: onSale.data,
        topSelling: topSelling.data,

      },
    };
  } catch (error) {
    console.log(error);
    return { props: { communitypost: [], onSaleProducts: [] } };
  }
}
