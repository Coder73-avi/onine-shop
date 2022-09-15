import Link from "next/link";
import React, { useState } from "react";
import css from "./style.module.css";
import { FaUser } from "react-icons/fa";
import {
  AiFillHeart,
  AiOutlineUnlock,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import logo from "images/logo.png";
import Image from "next/image";
import DropDownCart from "components/Cart/DropDownCart";
import { useStateValue } from "controllers/Reducer/stateProvider";

const Navigation = () => {
  const [showCart, setShowCart] = useState(false);
  const [{ cart }, dispatch] = useStateValue();

  const subMenu = [
    { name: "My Account", icon: <FaUser />, path: "/myaccount" },
    {
      name: "My wishlist",
      icon: <AiFillHeart />,
      path: "/wishlist",
    },
    { name: "Sign In", icon: <AiOutlineUnlock />, path: "/login" },
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
  return (
    <>
      <section
        className={` sticky py-3 px-6 border-b flex flex-row justify-between items-center`}
      >
        <div className={`text-xs text-gray-400`}>Default Welcome Msg!</div>
        <nav className={css.sub__nav}>
          {subMenu.map(({ name, icon, path }, indx) => (
            <div
              key={indx}
              className={`flex flex-row gap-2 justify-center items-center px-5 ${
                subMenu.length - 1 !== indx ? "border-r" : " "
              } `}
            >
              <div className={css.sub__icon}>{icon}</div>
              <Link href={path}>
                <a className={``}>{name}</a>
              </Link>
            </div>
          ))}
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
            data-checkout={cart?.length || 0}
            onClick={() => setShowCart(!showCart)}
          >
            <AiOutlineShoppingCart />
          </div>
        </div>
        {showCart && (
          <DropDownCart setShowCart={setShowCart} showCart={showCart} />
        )}
      </section>
    </>
  );
};

export default Navigation;
