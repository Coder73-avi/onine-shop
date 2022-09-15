import React, { useState, useEffect } from "react";
import Image from "next/image";
import css from "./style.module.css";
import Link from "next/link";

import { IoCloseSharp } from "react-icons/io5";

import image1 from "images/products/1.webp";
import { useStateValue } from "controllers/Reducer/stateProvider";

const WhishList = () => {
  const tableHead = [
    "Remove",
    "Images",
    "Product Name",
    "No of Unit",
    "Unit Price",
    "Stock Status",
    "Add To Cart",
  ];
  const [wiselist, setWiseList] = useState([]);
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const localWise = JSON.parse(window.localStorage.getItem("wiselist"));
    setWiseList(localWise);
  }, []);

  const removeFromWiseList = (id) => {
    setWiseList((prev) => prev.filter((val) => val.id !== id));
    window.localStorage.setItem(
      "wiselist",
      JSON.stringify(wiselist.filter((val) => val.id !== id))
    );
  };

  const AddToCart = (data) => {
    const { id, title, price, imageSrc, newProduct, saleStatus } = data;

    dispatch({
      type: "ADDTOCART",
      cart: {
        id,
        title,
        price,
        imgSrc: imageSrc,
        qty: 1,
        saleStatus,
        newProduct,
      },
    });
    // router.push(`/shoppingcart`);
  };

  return (
    <section className="w-[90%] mx-auto my-2">
      <h1 className="font-semibold py-2 uppercase">My Wishlists</h1>
      <hr className="mb-4" />

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-center ">
          <thead className="text-sm font-bold">
            <tr>
              {tableHead.map((val, indx) => (
                <th key={indx} scope="col" className="border py-5 px-6">
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wiselist?.map((val, indx) => (
              <tr key={indx} className="">
                <td className="py-4 px-6 border">
                  <div
                    className="flex flex-row justify-center items-center cursor-pointer"
                    onClick={() => removeFromWiseList(val?.id)}
                  >
                    <IoCloseSharp />
                  </div>
                </td>
                <td className="py-4 px-6 border">
                  <div className="relative">
                    <Image
                      src={val.imageSrc}
                      alt="product-image"
                      layout="responsive"
                      objectFit="responsive"
                      priority
                    />
                  </div>
                </td>
                <td className="py-4 px-6 border ">
                  <Link href={`/productdetails?id=${val?.id}`}>
                    <a className="hover:underline">{val?.title || "None"}</a>
                  </Link>
                </td>
                <td className="pys-4 px-6 border">{val?.qty || 1}</td>
                <td className="py-4 px-6 border">Rs. {val?.price}</td>
                <td className="py-4 px-6 border text-semibold">
                  {(indx + 1) % 2 ? (
                    <span className="success">In Stock</span>
                  ) : (
                    <span className="error">Out of Stock</span>
                  )}
                </td>
                <td className="py-4 px-6 border">
                  <button
                    className={css.addToCartBtn}
                    onClick={() => AddToCart(val)}
                  >
                    Add To Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default WhishList;
