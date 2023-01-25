import React from "react";
import css from "./style.module.css";
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumbs = ({ location }) => {
  return (
    <div className={`border-t border-b py-4 md:px-3 bg-white`}>
      <div
        className={`w-[95%] mx-auto flex flex-row items-center gap-2 ${css.bredcrumbs} custom-container`}
      >
        <Link href="/">
          <a className={`hover:underline ${css.bredcrumbs__text}`}>
            <FaHome /> Home
          </a>
        </Link>
        {location?.map((val, indx) => {
          return (
            <Link href={val?.path} key={indx}>
              <a
                className={`hover:underline ${css.bredcrumbs__text} capitalize`}
              >
                <IoIosArrowForward />
                <span
                  className={indx === location.length - 1 ? css.active : ""}
                >
                  {val.name}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
