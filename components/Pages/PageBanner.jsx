import React from "react";
import about1 from "images/about-us-title-img.jpg";
import Image from "next/image";

import css from "./css/PageBanner.module.css";
import DefaultImage from "components/DefaultImage";
import { useEffect } from "react";
import { useState } from "react";

const PageBanner = ({ title, bgImage }) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  useEffect(() => {
    const handle = () => setScrollHeight(window.scrollY);

    addEventListener("scroll", handle);
    return () => removeEventListener("scroll", handle);
  }, []);
  return (
    <div className={css.banner_heading}>
      <div
        className={css.banner_image}
        style={{ top: `${scrollHeight > 90 ? "0px" : "100px"}` }}
      >
        <div className="  max-h-[90vh] w-full">
          <DefaultImage src={bgImage || about1} alt="about-us-title-img" />
        </div>
      </div>
      {title ? <h1 className="px-10">{title || "Page Title"}</h1> : null}
    </div>
  );
};

export default PageBanner;
