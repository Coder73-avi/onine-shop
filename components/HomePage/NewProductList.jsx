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

const NewProductList = () => {
  const bedroom = [image1, image2, image3];
  const livingroom = [image4, image5, image6];
  return (
    <>
      <div className="w-[90%] xl:container mx-auto my-8">
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
  maxRating = 3,
}) => {
  return (
    <Link href={`/productdetails/${pid}`}>
      <a className={css.card}>
        <div className="relative w-[30%] rounded-md overflow-hidden">
          <DefaultImage
            src={imgSrc || defaultImage}
            alt={originalName || "default-image"}
            objectFit={"cover"}
          />
        </div>
        <div className={css.card__text}>
          <h2 className={css.card__title}>{title.slice(0, 16) + " . . ."}</h2>
          <ProductRating maxRating={maxRating} />
          <div className={css.card__price}>Rs. {formatingNumber(price)} </div>
        </div>
      </a>
    </Link>
  );
};
