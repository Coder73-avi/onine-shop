import React, { useMemo } from "react";
import css from "./css/designbyhobbies.module.css";

import pinter from "images/home/painter.jpg";
import music from "images/home/musician.jpg";
import videographer from "images/home/videographer.jpg";
import poet from "images/home/poet.jpg";
import Image from "next/image";
import DefaultImage from "components/DefaultImage";

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
      <section className={css.design__by__hobbies}>
        <div className={css.hobbies__div} data-aos="zoom-in">
          <h1 className={css.title}>
            Design Your Room by <br />
            Your Hobbies
          </h1>
          <p className="text-sm text-justify">
            {`
            Anyone who has ever decorated a home or office has taken part in
            interior design. It's a popular topic for many home and garden
            entertainment television shows. It is a popular hobby for many
            people because you don't need a degree to take pride in decorating
            your home.`}
          </p>
          <button>Get Start</button>
        </div>
      </section>

      <div className="grid md:grid-cols-4 gap-10 p-4  mx-auto ">
        {designbyHobbies.map((val, indx) => (
          <div
            key={indx}
            className={
              "relative h-full w-full rounded-2xl overflow-hidden cursor-pointer "
            }
            data-aos="zoom-in"
          >
            <div className={css.hobbies__name}>{val.name}</div>
            <DefaultImage src={val.image} alt="design-image" />
          </div>
        ))}
      </div>
    </>
  );
};

export default DesignYourRoomByHobbies;
