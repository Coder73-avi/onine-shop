import Link from "next/link";
import React, { useCallback, useState, useEffect } from "react";
import css from "./style.module.css";
import { FaUser } from "react-icons/fa";
import {
  AiFillHeart,
  AiOutlineUnlock,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import axios from "controllers/axios";
import logo from "images/logo.png";
import Image from "next/image";
import DropDownCart from "components/Cart/DropDownCart";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { useRouter } from "next/router";
import { BsCartCheck } from "react-icons/bs";
import SetCookie, { GetCookie, RemoveCookie } from "controllers/SetCookie";
import Cookie from "js-cookie";

const Navigation = () => {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const [{ user, cartChange, carts }, dispatch] = useStateValue();

  const subMenu = [
    { name: "My Account", icon: <FaUser />, path: "/myaccount" },
    {
      name: "My Orders",
      path: "/myaccount?name=my-orders",
      icon: <BsCartCheck />,
    },
    {
      name: "My wishlist",
      icon: <AiFillHeart />,
      path: "/wishlist",
    },
    { name: "Check out", icon: <FaRegShareSquare />, path: "/checkout" },
  ];
  const mainMenu = [
    { name: "Home", icon: "", path: "/" },
    {
      name: "Shop",
      icon: "",
      path: "/shop",
    },
    {
      name: "Renting",
      icon: "",
      path: "/shop",
    },
    { name: "About Us", icon: "", path: "/" },
    { name: "Contact Us", icon: "", path: "/" },
  ];

  const logOut = async () => {
    try {
      // await axios.get("/logout");
      RemoveCookie("auth");
      alert("Log out successfully");
      dispatch({ type: "UPDATE__CART" });
      dispatch({ type: "AUTH__USER", user: null });
      dispatch({ type: "ADD__TO__CART", carts: [] });
      router.push("/login");
    } catch (error) {
      // console.error(error);
    }
  };

  // checking user is LogIn or Not

  const checkingUserAuth = useCallback(async () => {
    try {
      const getUser = await axios.get("/getuser");
      if (getUser.status == 200) {
        if (Array.isArray(getUser?.data)) {
          dispatch({ type: "AUTH__USER", user: getUser.data[0] });
        } else {
          dispatch({ type: "AUTH__USER", user: null });
        }
      }
    } catch (error) {
      // console.error(error);
      dispatch({ type: "AUTH__USER", user: null });
      return dispatch({ type: "ADD__TO__CART", carts: [] });
    }
  }, [dispatch]);

  useEffect(() => {
    checkingUserAuth();
  }, [checkingUserAuth]);

  const getCheckoutData = useCallback(async () => {
    try {
      if (user !== null) {
        const res = await axios.get("/getcheckouts", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.status == 200) {
          // console.log(res.data);
          return dispatch({ type: "ADD__TO__CART", carts: res.data });
        }
      }
    } catch (error) {
      return dispatch({ type: "ADD__TO__CART", carts: [] });
    }
  }, [user, cartChange]);

  useEffect(() => {
    getCheckoutData();
  }, [getCheckoutData]);

  return (
    <>
      <section
        className={` sticky py-3 px-6 border-b flex flex-row justify-between items-center`}
      >
        <div className={`text-xs text-gray-400`}>Default Welcome Msg!</div>
        <nav className={css.sub__nav}>
          {subMenu.map(({ name, icon, path }, indx) => {
            return (
              <Link href={path} key={indx}>
                <a className={``}>
                  <div
                    className={`flex flex-row gap-2 justify-center items-center px-5 ${
                      subMenu.length - 1 !== indx ? "border-r" : " "
                    } `}
                  >
                    <div className={css.sub__icon}>{icon}</div>
                    {name}
                  </div>
                </a>
              </Link>
            );
          })}
          <Link href={user !== null ? "#" : "/login"}>
            <a className={``}>
              <div
                className={`flex flex-row gap-2 justify-center items-center px-5 `}
                onClick={user !== null ? logOut : () => {}}
              >
                <div className={css.sub__icon}>
                  <AiOutlineUnlock />
                </div>
                {user !== null ? `Log Out` : "Sign In"}
              </div>
            </a>
          </Link>
        </nav>
      </section>

      <section className={css.main__nav__section}>
        <div className={`${css.main__logo} relative h-14 w-36`}>
          <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
        </div>

        <nav className={css.main__nav}>
          {mainMenu.map(({ name, path }, indx) => (
            <Link href={path} key={indx}>
              <a className={`${css.main__nav__link} font-semibold`}>{name}</a>
            </Link>
          ))}
        </nav>

        <div className={css.side__icons}>
          <form className={css.searchBox}>
            <input type="search" placeholder="Search products" />
            <BiSearch className="text-lg" />
          </form>
          <div
            className={css.shopping__cart}
            data-checkout={carts?.length || 0}
            onClick={() => setShowCart(!showCart)}
          >
            <AiOutlineShoppingCart />
          </div>
        </div>
        {showCart && (
          <DropDownCart
            setShowCart={setShowCart}
            showCart={showCart}
            carts={carts}
          />
        )}
      </section>
    </>
  );
};

export default Navigation;
