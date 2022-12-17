import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import css from "./style.module.css";

import { BsFillCartFill } from "react-icons/bs";
import { AiFillStar, AiOutlineFullscreen } from "react-icons/ai";
import { useRouter } from "next/router";
import { useStateValue } from "controllers/Reducer/stateProvider";
import DefaultImage from "components/DefaultImage";
import { addToCart } from "controllers/cartControl";
import { addToWishList } from "controllers/wishListControl";
import axios from "controllers/axios";

import QuickView from "./QuickView";

import defaultImage from "images/default-image-300x300.png";

const ShopCard = ({ data }) => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const [activeStatus, setActiveStatus] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const AddToCart = async () => {
    try {
      if (user == null) {
        return router.push("/login");
      }

      await addToCart({ product__id: data?.pid, qty: 1, product__option: "" });
      return dispatch({
        type: "UPDATE__CART",
      });
    } catch (error) {
      router.push("/login");
      console.error(error);
    }
  };

  const AddToWishList = async () => {
    try {
      if (user == null) {
        return router.push("/login");
      }

      const req = await axios.get("/getwishlists");
      const found = req.data?.some((val) => val.product__id == data?.pid);

      if (found) {
        const remove = await axios.delete("/deletewishlist/" + data?.pid);
        if (remove.status == 200) return setActiveStatus(false);
      }

      await addToWishList({ product__id: data?.pid });
      return setActiveStatus(true);
    } catch (error) {
      router.push("/login");
      // console.error(error);
    }
  };

  const checkWishListIsActive = useCallback(async () => {
    try {
      const req = await axios.get("/getwishlists");
      if (req.status == 200) {
        const wishlistData = req.data;
        const found = wishlistData?.some((val) => val.pid == data.pid);
        if (found) setActiveStatus(found);
      }
    } catch (error) {
      // console.error(error);
    }
  }, [data?.pid]);

  useEffect(() => {
    if (user) checkWishListIsActive();
  }, [checkWishListIsActive, user]);

  return (
    <>
      {quickView ? <QuickView setQuickView={setQuickView} data={data} /> : null}
      <div className={`shadow-2xl  hover:cursor-pointer ${css.shopCard}`}>
        <div className="relative overflow-hidden">
          {data?.is__new ? <div className={css.newBtn}>New</div> : null}
          {data?.on__sale == "1" ? (
            <div className={`${css.saleBtn} ${data?.is__new ? css.new : null}`}>
              Sale !
            </div>
          ) : null}
          <Link href={`/productdetails/${data?.title?.replaceAll(' ', "_")}`}>
            <a>
            
              <DefaultImage
                src={data?.imageSrc || defaultImage}
                alt="card-images"
                className={"rounded-md overflow-hidden hover:opacity-80"}
              />
            </a>
          </Link>

          <div className={css.card__btn}>
            <button title="Add To Cart" onClick={AddToCart}>
              <BsFillCartFill />
            </button>
            <button
              title="Add To Whishlist"
              onClick={AddToWishList}
              className={activeStatus ? css.active : ""}
            >
              <AiFillStar />
            </button>
            <button title="Quick View" onClick={() => setQuickView(!quickView)}>
              <AiOutlineFullscreen />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
