import React from "react";
import css from "./css/newproducts.module.css";

import image1 from "images/newproduct/1.webp";
import image2 from "images/newproduct/2.webp";
import image3 from "images/newproduct/3.webp";
import image4 from "images/newproduct/4.webp";
import image5 from "images/newproduct/5.webp";
import image6 from "images/newproduct/6.webp";

import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";

const NewProductList = () => {
  const bedroom = [image1, image2, image3];
  const livingroom = [image4, image5, image6];
  return (
    <>
      <div className="w-[90%] mx-auto my-8">
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

export const Card = ({ imgSrc, title, price }) => {
  return (
    <div className={css.card}>
      <div className="relative w-[30%]">
        <Image
          src={imgSrc || image1}
          alt="card-image"
          layout="responsive"
          objectFit="responsive"
        />
      </div>
      <div className={css.card__text}>
        <h2 className={css.card__title}>{title}</h2>
        <div className={css.card__rating}>
          {Array(5)
            .fill()
            .map((val, indx) => (
              <BsFillStarFill key={indx} />
            ))}
        </div>
        <div className={css.card__price}>Rs. {price} </div>
      </div>
    </div>
  );
};
