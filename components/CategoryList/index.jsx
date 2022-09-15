import React from "react";
import css from "./style.module.css";
import Link from "next/link";

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

const CategoryList = () => {
  return (
    <div className={`container mx-auto `}>
      <div className={css.categoryDiv}>
        {category.sort().map((val, indx) => (
          <Link
            href={`/shop?category=${val.toLowerCase().replace(" ", "-")}`}
            key={indx}
          >
            <a className={css.category}>{val}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
