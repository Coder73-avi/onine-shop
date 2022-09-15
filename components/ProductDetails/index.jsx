import Image from "next/image";
import React, { useState, useEffect } from "react";
import css from "./style.module.css";

import product1 from "images/products/1.webp";

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
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import image4 from "images/newproduct/4.webp";
import image5 from "images/newproduct/5.webp";
import image6 from "images/newproduct/6.webp";
import { Card } from "components/HomePage/NewProductList";
import MoreDetails from "./MoreDetails";

const ProductDetails = ({ data }) => {
  const livingroom = [image4, image5, image6, image4];

  const [numOrder, setNumOrder] = useState(1);
  const router = useRouter();
  const [{}, dispatch] = useStateValue();
  const [activeStatus, setActiveStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    `${data?.imageSrc[0]?.url}` || product1
  );

  const PrevArrow = ({ onClick }) => {
    return (
      <div className={css.arrows + " " + css.leftArrow} onClick={onClick}>
        <IoIosArrowBack />
      </div>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className={css.arrows + " " + css.rightArrow} onClick={onClick}>
        <IoIosArrowForward />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoading: true,
    speed: 500,
    cssEase: "linear",
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

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

  const AddToCart = () => {
    const { id, title, price, imgSrc, newProduct, saleStatus } = data;

    dispatch({
      type: "ADDTOCART",
      cart: { id, title, price, imgSrc, qty: numOrder, saleStatus, newProduct },
    });
    // router.push(`/shoppingcart`);
  };

  const AddToWishList = () => {
    const oldData = JSON.parse(window.localStorage?.getItem("wiselist"));
    const { id } = router.query;
    const { imgSrc, title, price } = data;
    const check = oldData.some((val) => val.id == id);
    if (check) {
      const filterData = oldData.filter((val) => val.id !== id);
      setActiveStatus(false);
      return window.localStorage.setItem(
        "wiselist",
        JSON.stringify(filterData)
      );
    }

    setActiveStatus(true);
    const newData = [
      ...(oldData || []),
      {
        id,
        imageSrc: imgSrc,
        title,
        price,
      },
    ];
    return window.localStorage.setItem("wiselist", JSON.stringify(newData));
  };

  useEffect(() => {
    const wiseList = JSON.parse(window.localStorage.getItem("wiselist"));
    const found = wiseList.some((val) => val.id == data?.id);
    if (found) setActiveStatus(true);
  }, [data?.id]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-8 gap-10">
        <div className="col-span-6 grid md:grid-cols-2 gap-8">
          <div>
            <div className="border p-4">
              <div className="relative">
                <DefaultImage
                  src={`http://localhost:4001/${imageUrl}` || product1}
                  alt="product-image"
                />
              </div>

              <div className="my-5 relative">
                <Slider {...settings}>
                  {data?.imageSrc.map((val, indx) => (
                    <div
                      key={indx}
                      onClick={() => setImageUrl(val?.url)}
                      className="relative w-24 h-24 cursor-pointer hover:opacity-80"
                    >
                      <Image
                        src={`http://localhost:4001/${val?.url}` || product1}
                        alt="carousel-images"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="mt-7">
              {/* <Slider {...settings}>
                {Array(6)
                  .fill()
                  .map((val, indx) => {
                    return (
                      <div key={indx} className="p-1">
                        <div className="relative h-32">
                          <Image
                            src={product1}
                            alt="product-image"
                            layout="fill"
                            objectFit="responsive"
                          />
                        </div>
                      </div>
                    );
                  })}
              </Slider> */}
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
              <p>{data?.discription || "(None)"}</p>
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
                <button className={css.addToCard} onClick={AddToCart}>
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

      {/* more details */}

      <MoreDetails />
    </div>
  );
};

export const ButtonHovering = ({ val }) => {
  const [Hovering, setHovering] = useState(false);

  return (
    <button
      className={css.share__btn}
      style={{
        color: Hovering ? "white" : val.color,
        backgroundColor: Hovering ? val.color : "transparent",
        borderColor: Hovering ? val.color : "rgb(168, 167, 167)",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {val.icon}
      <span>{val.name}</span>
    </button>
  );
};

export default ProductDetails;
