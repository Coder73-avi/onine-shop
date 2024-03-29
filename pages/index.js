import { useState } from "react";
import Head from "next/head";
import css from "../styles/Home.module.css";
import HomePage from "components/HomePage";
import RoomMakeOver from "components/HomePage/RoomMakeOver";
import DesignYourRoomByHobbies from "components/HomePage/DesignYourRoomByHobbies";
import NewProductList from "components/HomePage/NewProductList";
import CategoryListed from "components/HomePage/CategoryListed";
import axios from "controllers/axios";

export default function Home({
  onSaleProducts,
  sliderImages,
  designYourRoom,
  banners,
}) {
  const [searchCategory, setSearchCategory] = useState("");
  return (
    <>
      <Head>
        <title>Online Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage sliderImages={sliderImages} />
      <RoomMakeOver banner={banners?.room_make_over} />
      <DesignYourRoomByHobbies
        designYourRoom={designYourRoom}
        banner={banners?.design_your_room}
      />
      <NewProductList
        onSaleProducts={onSaleProducts}
        banner={banners?.on_sale}
      />

      {/* <CategoryListed /> */}
    </>
  );
}

export async function getStaticProps() {
  try {
    const onSale = await axios.get("/getonsaleproducts");
    const slider = await axios.get("/getsliderimages");
    // const roomMakeOver = await axios.get("/")
    const hobbies = await axios.get("/gethobbies");
    const getBanners = await axios.get("/getbanners");
    let banners = {
      room_make_over: {},
      design_your_room: {},
      on_sale: {},
    };
    getBanners?.data?.forEach(({ host, url, originalname, type }, indx) => {
      banners[type] = { src: host + url, alt: originalname };
    });

    return {
      props: {
        onSaleProducts: onSale.data,
        sliderImages: slider.data,
        designYourRoom: hobbies.data,
        banners,
      },
      revalidate: 60 * 20,
    };
  } catch (error) {
    return {
      props: {
        onSaleProducts: [],
        sliderImages: [],
        designYourRoom: [],
        banners: [],
      },
    };
  }
}
