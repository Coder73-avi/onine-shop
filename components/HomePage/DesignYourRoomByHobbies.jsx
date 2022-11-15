import React, { useMemo } from "react";
import css from "./css/designbyhobbies.module.css";

import pinter from "images/home/painter.jpg";
import music from "images/home/musician.jpg";
import videographer from "images/home/videographer.jpg";
import poet from "images/home/poet.jpg";
import coverImage from "images/Column-Horizontal.jpg";

import Image from "next/image";
import DefaultImage from "components/DefaultImage";
import Link from "next/link";

const DesignYourRoomByHobbies = () => {
  const designbyHobbies = useMemo(
    () => [
      { name: "Painter", image: pinter },
      { name: "Music", image: music },
      { name: "Videographer", image: videographer },
      { name: "Poet", image: poet },
    ],
    []
  );
  return (
    <>
      <section
        className={
          "relative h-24 md:h-36 lg:h-52 w-full overflow-hidden mb-4"
        }
      >
        <Image
          src={coverImage}
          alt="cover-image"
          layout="fill"
          objectFit="cover"
          objectPosition={"center"}
        />
        <div className="absolute z-50 text-white font-bold text-md md:text-xl lg:text-3xl flex flex-row justify-start xl:justify-center items-center w-full h-full px-6">
          Design Your Room By Hoobies
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 p-4  mx-auto ">
        {designbyHobbies.map((val, indx) => (
          <Link href={`/shop?category=${val.name.toLowerCase()}`} key={indx}>
            <div
              className={
                "relative h-[280px] md:h-[450px] w-full rounded-2xl overflow-hidden cursor-pointer "
              }
            >
              <div className={css.hobbies__name}>{val.name}</div>
              <DefaultImage src={val.image} alt="design-image" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DesignYourRoomByHobbies;
