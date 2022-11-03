import React from "react";
import css from "./style.module.css";
import Link from "next/link";
import Image from "next/image";

import defaultImage from "images/default-image-300x300.png";

export const category = [
  "All",
  "Bed",
  "Bedroom",
  "Lighting",
  "Table",
  "Chair",
  "Sofa",
  "Light",
  "Plants",
  "Room Accessory",
];

const CategoryList = ({ categorys }) => {
  return (
    <div className={`container mx-auto `}>
      <div className={css.categoryDiv}>
        {categorys?.sort().map((val, indx) => (
          <Link
            href={`/shop/${val?.name?.toLowerCase().replace(" ", "-")}`}
            key={indx}
          >
            <a className={css.category}>
              <div className="z-50 text-gray-700 text-center text-base w-full font-bold capitalize ">
                {val?.name}
              </div>
              <Image
                className={css.category__image}
                src={val?.imagesrc !== "" ? val?.imagesrc : defaultImage}
                alt={val?.imagesrc?.replace("categorysbg/", "")}
                layout="fill"
                objectFit="cover"
                objectPosition={"center"}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
