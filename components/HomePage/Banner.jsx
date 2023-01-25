import Image from "next/image";
import React from "react";
import defaultBanner from "images/defaultBanner.png";

const Banner = ({ src, alt, title = null }) => {
  return (
    <div className="w-full h-[250px] relative">
      <Image
        src={src || defaultBanner}
        alt={alt || "banner-image"}
        layout="fill"
        objectFit="cover"
        objectPosition={"center"}
      />
      {title !== null ? (
        <div className="absolute z-50 text-white font-bold text-md md:text-xl lg:text-3xl flex flex-row justify-start xl:justify-center items-center w-full h-full  px-6 ">
          {title}
        </div>
      ) : null}
    </div>
  );
};

export default Banner;
