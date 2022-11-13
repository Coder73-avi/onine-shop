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

import defaultImage from "images/default-image-300x300.png";

const ShopCard = ({ id, imageSrc, title, price, onSale, isNew }) => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const [activeStatus, setActiveStatus] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const AddToCart = async () => {
    try {
      if (user == null) {
        return router.push("/login");
      }

      await addToCart({ product__id: id, qty: 1, product__option: "" });
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
      const found = req.data?.some((val) => val.product__id == id);

      if (found) {
        const remove = await axios.delete("/deletewishlist/" + id);
        if (remove.status == 200) return setActiveStatus(false);
      }

      await addToWishList({ product__id: id });
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
        const found = wishlistData?.some((val) => val.product__id == id);
        if (found) setActiveStatus(found);
      }
    } catch (error) {
      // console.error(error);
    }
  }, [id]);

  useEffect(() => {
    checkWishListIsActive();
  }, [checkWishListIsActive]);

  return (
    <div className={`shadow-2xl  hover:cursor-pointer ${css.shopCard}`}>
      <div className="relative overflow-hidden">
        {isNew ? <div className={css.newBtn}>New</div> : null}
        {onSale == "1" ? (
          <div className={`${css.saleBtn} ${isNew ? css.new : null}`}>
            Sale !
          </div>
        ) : null}
        <Link href={`/productdetails/${id}`}>
          <a>
            {/* <div className={css.cardDetails}>
            <h2 className="text-lg hover:underline cursor-pointer font-bold">
              {title.slice(0, 20)} {title.length > 20 && " . . ."}
            </h2>
            <h3 className="text-lg font-bold ">Rs. {price}</h3>
          </div> */}

            <DefaultImage
              src={imageSrc || defaultImage}
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
          <button title="Quick View">
            <AiOutlineFullscreen />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
