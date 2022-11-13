import Image from "next/image";
import React from "react";
import css from "./style.module.css";
import defaultImage from "images/default-image-300x300.png";

const DefaultImage = ({ src, alt, className }) => {
  return (
    <div className={`${css.imageDiv} ${className}`}>
      <Image
        src={src || defaultImage}
        alt={alt || "default-images"}
        layout="fill"
        className={css.imageComponent}
        loading="lazy"
      />
    </div>
  );
};

export default DefaultImage;
