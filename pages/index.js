import { useState } from "react";
import Head from "next/head";
import css from "../styles/Home.module.css";
import HomePage from "components/HomePage";
import RoomMakeOver from "components/HomePage/RoomMakeOver";
import DesignYourRoomByHobbies from "components/HomePage/DesignYourRoomByHobbies";
import NewProductList from "components/HomePage/NewProductList";
import CategoryListed from "components/HomePage/CategoryListed";
import axios from "controllers/axios";

export default function Home({ onSaleProducts }) {
  const [searchCategory, setSearchCategory] = useState("");
  return (
    <>
      <Head>
        <title>Online Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
      <RoomMakeOver />
      <DesignYourRoomByHobbies />
      <NewProductList onSaleProducts={onSaleProducts} />

      {/* <CategoryListed /> */}
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
