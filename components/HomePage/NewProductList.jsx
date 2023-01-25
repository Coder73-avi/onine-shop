import React from "react";
import css from "./css/newproducts.module.css";

import image1 from "images/newproduct/1.webp";
import image2 from "images/newproduct/2.webp";
import image3 from "images/newproduct/3.webp";
import image4 from "images/newproduct/4.webp";
import image5 from "images/newproduct/5.webp";
import image6 from "images/newproduct/6.webp";

import defaultImage from "images/default-image-300x300.png";

import DefaultImage from "components/DefaultImage";
import Link from "next/link";
import { formatingNumber } from "controllers/otherFunctions";
import ProductRating from "components/ProductRating";
import Image from "next/image";
import onSaleBanner from "images/on-sale-banner.jpg";
import Banner from "./Banner";

const NewProductList = ({ onSaleProducts = [], banner }) => {
  // const bedroom = [image1, image2, image3];
  // const livingroom = [image4, image5, image6];

  return (
    <>
      <Banner src={banner?.src} alt={banner?.alt} />
      <div className="w-[90%] xl:container mx-auto my-8">
        {/* {false && (
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h2 className={css.title}>bedroom</h2>
              <hr />
              {bedroom.map((val, indx) => (
                <Card
                  key={indx}
                  imgSrc={val}
                  title="Faded Short Sleeves T-shirt"
                  price="3000"
                />
              ))}
            </div>
            <div>
              <h2 className={css.title}>livingroom</h2>
              <hr />
              {livingroom.map((val, indx) => (
                <Card
                  key={indx}
                  imgSrc={val}
                  title="Faded Short Sleeves T-shirt"
                  price="3000"
                />
              ))}
            </div>
            <div>
              <h2 className={css.title}>lighting</h2>
              <hr />
              {bedroom.map((val, indx) => (
                <Card
                  key={indx}
                  imgSrc={val}
                  title="Faded Short Sleeves T-shirt"
                  price="3000"
                />
              ))}
            </div>
          </div>
        )} */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
          {onSaleProducts?.map((val, indx) => {
            return (
              <div key={indx}>
                <Card
                  pid={val?.pid}
                  imgSrc={val?.imageSrc}
                  originalName={val?.originalname}
                  title={val?.title}
                  price={val?.price}
                  topselling={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NewProductList;

export const Card = ({
  pid = "1",
  imgSrc,
  title,
  price,
  originalName = null,
  rating,
  topselling = true,
}) => {
  return (
    <Link href={`/productdetails/${title.replaceAll(" ", "-")}`}>
      <a className={css.card}>
        <div
          className={`relative w-[30%] ${
            topselling ? "" : "min-h-[100px] h-full"
          } rounded-md overflow-hidden`}
        >
          {topselling ? (
            <DefaultImage
              src={imgSrc || defaultImage}
              alt={originalName || "default-image"}
              objectFit={"cover"}
            />
          ) : (
            <Image
              src={imgSrc || defaultImage}
              alt={originalName || "default-image"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </div>
        <div className={css.card__text}>
          <h2 className={css.card__title}>{title.slice(0, 16) + " . . ."}</h2>
          {rating ? (
            <ProductRating maxRating={rating} />
          ) : (
            <div className="text-xs font-bold text-gray-400">No Review</div>
          )}
          <div className={css.card__price}>Rs. {formatingNumber(price)} </div>
        </div>
      </a>
    </Link>
  );
};
