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

import { Card } from "components/HomePage/NewProductList";
import MoreDetails from "./MoreDetails";
import { addToCart } from "controllers/cartControl";
import { addToWishList } from "controllers/wishListControl";
import { formatingNumber } from "controllers/otherFunctions";
import ProductRating from "components/ProductRating";
import Slider from "react-slick";
import Swal from "sweetalert2";

const ProductDetails = ({ data, topSelling }) => {
  const router = useRouter();

  const [numOrder, setNumOrder] = useState(1);
  const [{ user }, dispatch] = useStateValue();
  const [activeStatus, setActiveStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [productOptions, setProducutOptions] = useState([]);
  const [productOption, setProducutOption] = useState("");

  useEffect(() => {
    setImageUrl(data?.images[0]?.url);
  }, [data?.images]);

  useEffect(() => {
    if (data?.product__options) {
      const options = JSON?.parse(data?.product__options) || [];
      setProducutOptions(options);
      setProducutOption(options[0] || null);
    }
  }, [data?.product__options]);

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
      await addToCart({
        product__id: data?.pid,
        qty: numOrder,
        product__option: productOption,
      });

      dispatch({
        type: "UPDATE__CART",
      });
      setNumOrder(1);
      return Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Add successfully in Cart",
        showConfirmButton: false,
        timer: 1000,
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

      await addToWishList({
        product__id: data.pid,
        product__option: productOption,
      });
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
        const found = wishlistData?.some((val) => val.pid == data.pid);
        if (found) setActiveStatus(found);
      }
    } catch (error) {
      // console.error(error);
    }
  }, [data?.pid]);

  useEffect(() => {
    if (user) checkWishListIsActive();
  }, [checkWishListIsActive, user]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data?.images?.length < 3 ? data?.images?.length : 3,
    slidesToScroll: 1,
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-8 gap-10">
        <div className="md:col-span-2 lg:col-span-6 grid grid-cols-5 lg:grid-cols-2 md:gap-1 lg:gap-8">
          <div className="col-span-5 md:col-span-2 lg:col-span-1">
            <div className="border p-4 md:p-1">
              <div className="relative rounded-md overflow-hidden">
                {data?.is__new ? <div className={css.newBtn}>New</div> : null}
                {data?.on__sale == "1" ? (
                  <div
                    className={css.saleBtn}
                    style={{ right: `${data?.is__new ? "2.7rem " : "0"}` }}
                  >
                    Sale !
                  </div>
                ) : null}
                <DefaultImage
                  src={data?.host + imageUrl || defaultImage}
                  alt={data?.originalname || "product-image"}
                />
              </div>

              <div className="my-5 ">
                <Slider {...settings}>
                  {data?.images?.map((val, indx) => (
                    <div key={indx}>
                      <div
                        onClick={() => setImageUrl(val.url)}
                        className="relative h-[100px] min-w-[120px] max-w-[120px] rounded-lg overflow-hidden cursor-pointer hover:opacity-50 transition"
                      >
                        <Image
                          src={`${data?.host + val.url}` || product1}
                          alt="carousel-images"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <article
            className={`col-span-5 md:col-span-3 lg:col-span-1 ${css.product__details}`}
          >
            <h1 className="font-bold text-2xl">
              {data?.title || "loading..."}
            </h1>
            {data?.rating ? (
              <ProductRating maxRating={data?.rating} />
            ) : (
              <div className="text-xs font-bold text-gray-400">No Review</div>
            )}
            <div className={css.price}>Rs. {formatingNumber(data?.price)} </div>
            <hr />
            <div className="text-sm text-justify">
              <h2 className="mb-4 text-gray-600 font-bold">Details </h2>
              <p>{data?.short__discription || "(None)"}</p>
            </div>
            <div className={css.stockCheck}>In Stock</div>
            {productOptions.length !== 0 ? (
              <div className="flex flex-row items-center gap-6">
                <div className="flex flex-col gap-2 text-sm">
                  <label htmlFor="size" className="text-gray-700">
                    Product Options
                  </label>

                  <select
                    name="size"
                    id="size"
                    className={css.selectOption}
                    value={productOption}
                    onChange={(e) => setProducutOption(e.target.value)}
                  >
                    {productOptions?.map((val, indx) => (
                      <option value="Black" key={indx}>
                        {val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : null}

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
              <div className="flex flex-row gap-4 ">
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

            <div className="flex flex-row flex-wrap md:flex-nowrap gap-4">
              {shareBtn.map((val, indx) => (
                <ButtonHovering key={indx} val={val} />
              ))}
            </div>
          </article>
        </div>
        <div className="lg:col-span-2 hidden lg:block">
          <h2 className="font-bold ">Top Selling</h2>
          {topSelling?.map((val, indx) => (
            <Card
              key={indx}
              pid={val?.pid}
              imgSrc={val?.imageSrc}
              originalName={val?.originalname}
              title={val?.title}
              price={val?.price}
              rating={val?.rating}
            />
          ))}
        </div>
      </div>

      <MoreDetails moreData={data?.more__info} pid={data?.pid} />
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
