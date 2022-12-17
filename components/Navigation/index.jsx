import Link from "next/link";
import React, { useCallback, useState, useEffect, useRef } from "react";
import css from "./style.module.css";
import { FaPeopleCarry, FaRegLightbulb, FaUser } from "react-icons/fa";
import {
  AiFillHeart,
  AiOutlineUnlock,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { MdAddShoppingCart, MdOutlinePublic } from "react-icons/md";

import axios from "controllers/axios";
import logo from "images/logo.png";
import Image from "next/image";
import DropDownCart from "components/Cart/DropDownCart";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { useRouter } from "next/router";
import { BsCartCheck } from "react-icons/bs";
import { GetCookie, RemoveCookie } from "controllers/SetCookie";
import { IoClose } from "react-icons/io5";

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

  { name: "About Us", icon: "", path: "/" },
  { name: "Contact Us", icon: "", path: "/" },
  {
    name: "Our Community",
    icon: <FaPeopleCarry />,
    path: "/ourcommunity",
  },
];

const Navigation = () => {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const [{ user, cartChange, carts }, dispatch] = useStateValue();
  const [responsiveNav, setResponsiveNav] = useState(false);

  // logout
  const logOut = async () => {
    try {
      RemoveCookie("auth");
      alert("Log out successfully");
      return window.location.href(false);
    } catch (error) {
      return console.error(error);
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

  const auth = GetCookie("auth");

  useEffect(() => {
    if (auth) checkingUserAuth();
    if (!auth) {
      dispatch({ type: "AUTH__USER", user: null });
      dispatch({ type: "EMPTYCART" });
      // router.push("/");
    }
  }, [auth, checkingUserAuth]);

  const getCheckoutData = useCallback(async () => {
    try {
      if (user !== null) {
        const res = await axios.get("/getcheckouts");
        if (res.status == 200) {
          // console.log(res.data);
          return dispatch({ type: "ADD__TO__CART", carts: res.data });
        }
      }
    } catch (error) {
      console.error(error);
      return dispatch({ type: "ADD__TO__CART", carts: [] });
    }
  }, [user, cartChange]);

  useEffect(() => {
    getCheckoutData();
  }, [getCheckoutData]);

  return (
    <>
      <section className={`hidden md:block sticky py-3 px-6 border-b bg-white`}>
        <div className=" flex flex-row md:justify-end lg:justify-between items-center custom-container ">
          <div className={`text-xs text-gray-400 hidden lg:block`}>
            Default Welcome Msg!
          </div>
          <nav className={css.sub__nav + ""}>
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
        </div>
      </section>

      <section className={css.main__nav__section + " bg-white border-b pb-2"}>
        <div className="flex flex-row justify-between items-center gap-2 custom-container ">
          <div className="flex flex-row gap-6 items-center">
            <div
              className={css.threeLine__bar}
              onClick={() => setResponsiveNav(!responsiveNav)}
            >
              <AiOutlineMenu />
            </div>
            <Link href="/">
              <a
                className={`${css.main__logo} relative h-10 w-20 md:h-14 md:w-36`}
              >
                <Image
                  src={logo}
                  alt="logo"
                  layout="fill"
                  objectFit="contain"
                />
              </a>
            </Link>
          </div>
          <nav className={css.main__nav}>
            {mainMenu.map(({ name, path, icon }, indx) => (
              <Link href={path} key={indx}>
                <a className={`${css.main__nav__link} font-semibold`}>
                  <span className="text-lg">{icon}</span> {name}
                </a>
              </Link>
            ))}
          </nav>
          <ResponsiveMenu
            user={user}
            logOut={logOut}
            setResponsiveNav={setResponsiveNav}
            responsiveNav={responsiveNav}
          />
          <div className={css.side__icons}>
            <div className=" block">
              <SearchBox />
            </div>
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
        </div>
      </section>
    </>
  );
};

export default Navigation;

const SearchBox = () => {
  const router = useRouter();
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    const route = router.query;
    if (route.hasOwnProperty("keywords")) {
      setKeywords(route.keywords);
    } else {
      setKeywords("");
    }
  }, [router.query]);

  const searchProduct = (e) => {
    e.preventDefault();
    if (keywords == "") return router.push("/shop");
    return router.push("/search/" + keywords);
  };
  return (
    <form className={` ${css.searchBox}`} onSubmit={searchProduct}>
      <input
        type="search"
        placeholder="Search products"
        onChange={(e) => setKeywords(e.target.value)}
        value={keywords}
        className={css.searchInput}
      />
      <button className="text-sm lg:text-lg hover:text-teal-600">
        <BiSearch />
      </button>
    </form>
  );
};

const ResponsiveMenu = ({ user, logOut, setResponsiveNav, responsiveNav }) => {
  const resMainMenu = [
    { name: "Home", icon: <AiOutlineHome />, path: "/" },
    {
      name: "Shop",
      icon: <AiOutlineShoppingCart />,
      path: "/shop",
    },
    {
      name: "Renting",
      icon: <MdAddShoppingCart />,
      path: "/renting",
    },
    { name: "About Us", icon: <FaRegLightbulb />, path: "/about" },

    { name: "My Account", icon: <AiOutlineUser />, path: "/myaccount" },
    {
      name: "My Orders",
      icon: <BsCartCheck />,
      path: "/myaccount?name=my-orders",
    },
    {
      name: "My Wiselist",
      icon: <AiOutlineHeart />,
      path: "/wishlist",
    },
    {
      name: "My Checkouts",
      icon: <FaRegShareSquare />,
      path: "/checkout",
    },
  ];
  const resNavRef = useRef();

  useEffect(() => {
    const handle = (e) => {
      if (!resNavRef.current?.contains(e.target))
        return setResponsiveNav(false);
    };

    addEventListener("mousedown", handle);
    return () => removeEventListener("mousedown", handle);
  }, []);
  return (
    <div
      className={css.responsive__div}
      style={{ left: responsiveNav ? "0%" : "-60%" }}
      ref={resNavRef}
    >
      <div className="py-6 relative">
        <div
          className="text-2xl text-white hover:text-red-600 absolute top-2 right-3 cursor-pointer z-50"
          onClick={() => setResponsiveNav(false)}
        >
          <IoClose />
        </div>
        <div className="relative h-16">
          <Image
            src={logo}
            alt="company-logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <nav className={css.responsive__nav}>
          {/* <div
            className="absolute top-5 right-5 text-3xl"
            onClick={() => setResponsiveNav(false)}
          >
            <IoClose />
          </div> */}
          {resMainMenu.map(({ name, icon, path }, indx) => (
            <Link href={path} key={indx}>
              <a className={` `} onClick={() => setResponsiveNav(false)}>
                <div className={css.responsive__link}>
                  <span>{icon}</span>
                  {name}
                </div>
              </a>
            </Link>
          ))}
          <Link href={user !== null ? "#" : "/login"}>
            <a className={``}>
              <div
                className={css.responsive__link}
                onClick={user !== null ? logOut : () => {}}
              >
                <span>
                  <AiOutlineUnlock />
                </span>
                {user !== null ? `Log Out` : "Sign In"}
              </div>
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
};
