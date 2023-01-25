import axios from "controllers/axios";
import Breadcrumbs from "components/Breadcrumbs";
import AboutPage from "components/Pages/AboutPage";
import Head from "next/head";

export default function About({ brands }) {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <main>
        <Breadcrumbs location={[{ name: "About Us", path: "/about" }]} />
        <AboutPage brands={brands} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const brands = await axios.get("/getbrands");
    return { props: { brands: brands.data } };
  } catch (error) {
    return { props: { barands: [] } };
  }
}
