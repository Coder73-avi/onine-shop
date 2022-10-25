import React, { useState, useEffect } from "react";
import Image from "next/image";
import css from "./style.module.css";
import Link from "next/link";

import { BsTrash } from "react-icons/bs";
import { TbShoppingCartPlus } from "react-icons/tb";

import { useStateValue } from "controllers/Reducer/stateProvider";
import demoimage from "images/default-image-300x300.png";
import DefaultImage from "components/DefaultImage";

const WhishList = () => {
  const [wiselist, setWiseList] = useState([]);

  return (
    <section className="w-[90%] mx-auto my-2">
      <h1 className="font-semibold py-2 uppercase">My Wishlists</h1>
      <hr className="mb-4" />

      <div className="grid md:grid-cols-2 gap-4">
        {Array(6)
          .fill()
          .map((val, indx) => {
            return (
              <Link key={indx} href={"/productdetails/1"}>
                <a
                  key={indx}
                  className="flex flex-row gap-4 items-center border-b pb-4"
                >
                  <div className="h-20 relative rounded-md overflow-hidden ">
                    <DefaultImage src={demoimage} alt="wiselist-image" />
                  </div>
                  <div className="flex flex-col items-start justify-between gap-1 py-2">
                    <div className="text-sm">
                      New Stylish & Breathable Comfortable Lace-Up Shoes For Men
                    </div>
                    <div className="font-bold  text-teal-600">Rs. 4000</div>
                    <div className="text-base cursor-pointer hover:text-teal-600">
                      <BsTrash />
                    </div>
                  </div>
                  <div className="bg-teal-700 rounded-lg text-xl text-white p-2 hover:opacity-70 cursor-pointer">
                    <TbShoppingCartPlus />
                  </div>
                </a>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default WhishList;
