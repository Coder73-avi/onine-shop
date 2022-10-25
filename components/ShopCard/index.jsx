import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import css from "./style.module.css";

import { BsFillCartFill } from "react-icons/bs";
import { AiFillStar, AiOutlineFullscreen } from "react-icons/ai";
import { useRouter } from "next/router";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { toast } from "react-toastify";
import DefaultImage from "components/DefaultImage";
import { addToCart } from "controllers/cartControl";

const ShopCard = ({ id, imageSrc, title, price, saleStatus, newProduct }) => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateValue();
  const [activeStatus, setActiveStatus] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const AddToCart = async () => {
    try {
      if (user == null) {
        return router.push("/login");
      }

      await addToCart({ product__id: id, qty: 1 });
      return dispatch({
        type: "UPDATE__CART",
      });
    } catch (error) {
      router.push("/login");
      console.error(error);
    }
  };

  const AddToWishList = () => {
    const oldData = JSON.parse(window.localStorage?.getItem("wiselist"));
    const check = oldData?.some((val) => val.id == id);
    console.log(check);

    if (check) {
      const filterData = oldData.filter((val) => val.id !== id);
      setActiveStatus(false);
      return window.localStorage.setItem(
        "wiselist",
        JSON.stringify(filterData)
      );
    }
    setActiveStatus(true);
    const newData = [
      ...(oldData || []),
      {
        id,
        imageSrc,
        title,
        price,
      },
    ];
    return window.localStorage.setItem("wiselist", JSON.stringify(newData));
  };

  useEffect(() => {
    const wiseList = JSON.parse(window.localStorage.getItem("wiselist"));
    const found = wiseList?.some((val) => val.id == id);
    if (found) setActiveStatus(true);
  }, [id]);

  return (
    <div
      className={css.shopCard}
      // onClick={() => router.push(`/productdetails/${id}`)}
    >
      <div className="relative ">
        {newProduct && <div className={css.newBtn}>New</div>}
        {saleStatus && (
          <div
            className={css.saleBtn}
            style={{ right: `${newProduct ? "2.7rem " : "0"}` }}
          >
            Sale !
          </div>
        )}
        <Link href={`/productdetails/${id}`}>
          <div className={css.cardDetails}>
            <h2 className="text-lg hover:underline cursor-pointer font-bold">
              {title}
            </h2>
            <h3 className="text-lg font-bold ">Rs. {price}</h3>
          </div>
        </Link>

        <DefaultImage
          src={imageSrc}
          alt="card-images"
          className={"rounded-lg overflow-hidden hover:opacity-80"}
        />
        {/* <Image
          onClick={() => router.push(`/productdetails?id=${id}`)}
          className="cursor-pointer hover:opacity-80"
          src={imageSrc}
          alt="shop-card-image"
          layout="responsive"
          objectFit="responsive"
          loading="lazy"
        /> */}

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
