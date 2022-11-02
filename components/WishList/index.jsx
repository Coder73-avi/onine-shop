import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import css from "./style.module.css";
import Link from "next/link";
import axios from "controllers/axios";

import { BsTrash } from "react-icons/bs";
import { TbShoppingCartPlus } from "react-icons/tb";

import demoimage from "images/default-image-300x300.png";
import DefaultImage from "components/DefaultImage";
import Loading from "components/Loading";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { addToCart } from "controllers/cartControl";
import { useRouter } from "next/router";

const WhishList = () => {
  const router = useRouter();
  const [{}, dispatch] = useStateValue();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = useCallback(async () => {
    try {
      const reqWishlist = await axios.get("/getwishlists");
      if (reqWishlist.status == 200) {
        const newData = [];
        const wishlistData = reqWishlist.data;

        for (let i = 0; i < wishlistData.length; i++) {
          const id = wishlistData[i].id;
          const product__id = wishlistData[i].product__id;
          const product = await axios.get("/getproduct/" + product__id);
          const images = await axios.get("/getproductimages/" + product__id);

          const title = product.data[0].title;
          const price = product.data[0].price;
          const category = product.data[0].category;
          const imageSrc = process.env.URL + "/" + images.data[0].url;
          const alt = images.data[0].name;

          console.log(title);
          newData.push({
            id,
            product__id,
            title,
            price,
            category,
            imageSrc,
            alt,
          });
        }
        setWishlist(newData);
        setLoading(false);
      }
    } catch (error) {
      setWishlist([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  const RemoveFromWishList = async (id) => {
    try {
    } catch (error) {}
  };
  const AddToCart = async (id) => {
    try {
      await addToCart({ product__id: id, qty: 1 });
      return dispatch({
        type: "UPDATE__CART",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sendToDetails = (id) => {
    return router.push("/productdetails/" + id);
  };

  return (
    <section className="w-[90%] mx-auto my-2">
      <h1 className="font-semibold py-2 uppercase">My Wishlists</h1>
      <hr className="mb-4" />

      {loading && <Loading />}
      {wishlist.length == 0 && !loading && (
        <div className="text-sm text-gray-500 pb-4">
          0 WishList found.{" "}
          <Link href="/shop">
            <a className="text-blue-600">Shop Now</a>
          </Link>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-12">
        {wishlist?.map((val, indx) => {
          return (
            <div
              key={indx}
              className={`flex flex-row gap-4 items-center justify-between p-4 cursor-pointer bg-gray-100 rounded-lg ${
                wishlist?.length - 2 > indx ? "border-b" : ""
              } `}
            >
              <div
                className="flex flex-row gap-3 hover:underline"
                onClick={() => sendToDetails(val?.product__id)}
              >
                <div className="h-20 relative rounded-md overflow-hidden ">
                  <DefaultImage
                    src={val?.imageSrc || demoimage}
                    alt="wiselist-image"
                  />
                </div>
                <div className="flex flex-col items-start justify-between gap-1 py-2">
                  <div className="text-sm">{val?.title || "None"}</div>
                  <div className="font-bold  text-teal-600">
                    Rs. {val?.price || "1000"}
                  </div>
                  <div
                    className="text-base cursor-pointer hover:text-teal-600"
                    title="Remove"
                    onClick={() => RemoveFromWishList(val?.id)}
                  >
                    <BsTrash />
                  </div>
                </div>
              </div>
              <div
                className="bg-teal-700 rounded-lg text-xl text-white p-2 hover:opacity-70 cursor-pointer "
                title="Add To Cart"
                onClick={() => AddToCart(val?.product__id)}
              >
                <TbShoppingCartPlus />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhishList;
