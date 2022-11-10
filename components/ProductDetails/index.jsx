import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import css from "./css/style.module.css";

import { BsFillCartCheckFill } from "react-icons/bs";
import {
  AiOutlineTwitter,
  AiOutlineGooglePlus,
  AiFillStar,
} from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";

import { useStateValue } from "controllers/Reducer/stateProvider";
import { useRouter } from "next/router";
import DefaultImage from "components/DefaultImage";
import axios from "controllers/axios";

import defaultImage from "images/default-image-300x300.png";
import image4 from "images/newproduct/4.webp";
import image5 from "images/newproduct/5.webp";
import image6 from "images/newproduct/6.webp";
import { Card } from "components/HomePage/NewProductList";
import MoreDetails from "./MoreDetails";
import { addToCart } from "controllers/cartControl";
import { addToWishList } from "controllers/wishListControl";

const ProductDetails = ({ data }) => {
  const router = useRouter();
  const livingroom = [image4, image5, image6, image4];

  const [numOrder, setNumOrder] = useState(1);
  const [{ user }, dispatch] = useStateValue();
  const [activeStatus, setActiveStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState(data?.imageSrc);

  const shareBtn = [
    { name: "Share", icon: <FaFacebookF />, link: "", color: "#435f9f" },
    {
      name: "Tweet",
      icon: <AiOutlineTwitter />,
      link: "",
      color: "#00aaf0",
    },
    {
      name: "Google+",
      icon: <AiOutlineGooglePlus />,
      link: "",
      color: "#e04b34",
    },

    {
      name: "Printerest",
      icon: <FaPinterestP />,
      link: "",
      color: "#ce1f21",
    },
  ];

  const AddToCart = async () => {
    try {
      if (user == null) {
        return router.push("/login");
      }
      await addToCart({ product__id: data?.pid, qty: numOrder });
      return dispatch({
        type: "UPDATE__CART",
      });
    } catch (error) {
      router.push("/login");
      console.error(error);
    }
  };

  const AddToWishList = async () => {
    try {
      if (user == null) {
        return router.push("/login");
      }
      if (activeStatus) {
        const remove = await axios.delete("/deletewishlist/" + data.id);

        if (remove.status == 200) {
          setActiveStatus(false);
        }
        return;
      }

      await addToWishList({ product__id: data.id });
      setActiveStatus(true);
      return dispatch({
        type: "UPDATE__CART",
      });
    } catch (error) {
      // console.error(error);
      router.push("/login");
    }
  };

  const checkWishListIsActive = useCallback(async () => {
    try {
      const req = await axios.get("/getwishlists");
      if (req.status == 200) {
        const wishlistData = req.data;
        const found = wishlistData?.some((val) => val.product__id == data.id);
        if (found) setActiveStatus(found);
      }
    } catch (error) {
      // console.error(error);
    }
  }, [data.id]);

  useEffect(() => {
    checkWishListIsActive();
  }, [checkWishListIsActive]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-8 gap-10">
        <div className="col-span-6 grid md:grid-cols-2 gap-8">
          <div>
            <div className="border p-4">
              <div className="relative rounded-md overflow-hidden">
                <DefaultImage
                  src={imageUrl || defaultImage}
                  alt="product-image"
                />
              </div>

              <div className="my-5 grid grid-cols-3 lg:grid-cols-3 gap-4">
                {data?.images?.map((val, indx) => (
                  <div
                    key={indx}
                    onClick={() => setImageUrl(val.url)}
                    className="relative w-28 h-24 cursor-pointer hover:opacity-80 rounded-md overflow-hidden "
                  >
                    <Image
                      src={`${val.url}` || product1}
                      alt="carousel-images"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <article className={`${css.product__details}`}>
            <h1 className="font-bold text-2xl">
              {data?.title || "loading..."}
            </h1>
            <div className={css.price}>Rs. {data?.price} </div>
            <div className={css.reference}>
              <b>Reference : </b> demo_2
            </div>
            <div className={css.condition}>
              <b>Condition : </b> {data?.newProduct && "New Product, "}
              {data?.saleStatus && "On Sale"}
            </div>
            <hr />
            <div className="text-sm text-justify">
              <h2 className="mb-4 text-gray-600 font-bold">Details </h2>
              <p>{data?.short__discription || "(None)"}</p>
            </div>
            <div className={css.stockCheck}>In Stock</div>
            <div className="flex flex-row items-center gap-6">
              <div className="flex flex-row gap-2 items-center text-sm">
                <label htmlFor="size" className="text-gray-700">
                  Size
                </label>
                <select name="size" id="size" className={css.selectOption}>
                  <option value="S">S</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center text-sm">
                <label htmlFor="size" className="text-gray-700">
                  Color
                </label>
                <select name="size" id="size" className={css.selectOption}>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                </select>
              </div>
            </div>

            <div className={css.action}>
              <div className="border p-2 flex flex-row gap-4 text-gray-600 text-sm">
                <button
                  onClick={() =>
                    setNumOrder(numOrder <= 1 ? 1 : parseInt(numOrder) - 1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  value={numOrder < 1 ? 1 : numOrder}
                  onChange={(e) => setNumOrder(e.target.value)}
                />
                <button onClick={() => setNumOrder(parseInt(numOrder) + 1)}>
                  +
                </button>
              </div>
              <div className="flex flex-row gap-4">
                <button className={css.addToCard} onClick={AddToCart}>
                  <BsFillCartCheckFill /> Add To Card
                </button>
                <button
                  className={css.addToCard}
                  onClick={() => {
                    AddToCart();
                    return router.push("/checkout");
                  }}
                >
                  Buy Now
                </button>
              </div>
              <div>
                <button
                  title="Add To Whishlist"
                  onClick={AddToWishList}
                  className={`${css.wishlistbtn} ${activeStatus && css.active}`}
                >
                  <AiFillStar />
                </button>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              {shareBtn.map((val, indx) => (
                <ButtonHovering key={indx} val={val} />
              ))}
            </div>
          </article>
        </div>
        <div className="col-span-2">
          <h2 className="font-bold ">Top Selling</h2>
          {livingroom.map((val, indx) => (
            <Card
              key={indx}
              imgSrc={val}
              title="Faded Short Sleeves T-shirt"
              price="3000"
            />
          ))}
        </div>
      </div>

      <MoreDetails />
    </div>
  );
};

export default ProductDetails;

export const ButtonHovering = ({ val }) => {
  const [Hovering, setHovering] = useState(false);

  return (
    <button
      className={css.share__btn}
      style={{
        color: Hovering ? "white" : val.color,
        backgroundColor: Hovering ? val.color : "transparent",
        borderColor: val.color,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {val.icon}
      <span>{val.name}</span>
    </button>
  );
};
