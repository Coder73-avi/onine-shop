import ShopCard from "components/ShopCard";
import { productsList } from "controllers/productsList";
import React from "react";

const CategoryListed = () => {
  return (
    <>
      <div className="w-[90%] mx-auto my-10">
        <h1 className="font-bold text-3xl">Category</h1>
      </div>
      <div className="w-[90%] mx-auto my-10 md:columns-3 lg:columns-4 gap-4 ">
        {productsList.map(({ title, price, imgSrc }, indx) => (
          <div className="mb-8" key={indx}>
            <ShopCard imageSrc={imgSrc} id={indx} title={title} price={price} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryListed;
