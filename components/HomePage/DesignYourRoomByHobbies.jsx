import React, { useCallback, useEffect, useMemo, useState } from "react";
import css from "./css/designbyhobbies.module.css";

import pinter from "images/home/painter.jpg";
import music from "images/home/musician.jpg";
import videographer from "images/home/videographer.jpg";
import poet from "images/home/poet.jpg";
import coverImage from "images/Column-Horizontal.jpg";

import Image from "next/image";
import DefaultImage from "components/DefaultImage";
import Link from "next/link";
import Slider from "react-slick";
import Banner from "./Banner";

const DesignYourRoomByHobbies = ({ designYourRoom, banner }) => {
  const [noOfSlides, setNoOfSlides] = useState(4);
  const designbyHobbies = useMemo(
    () => [
      { name: "Painter", image: pinter },
      { name: "Music", image: music },
      { name: "Videographer", image: videographer },
      { name: "Poet", image: poet },
    ],
    [],
  );
  const getScreenWidth = () => {
    console.log("width = ", window.innerWidth);
    const width = window.innerWidth;
    if (width < 1115 && width >= 530) return setNoOfSlides(3);
    if (width < 530) return setNoOfSlides(2);
  };
  useEffect(() => {
    getScreenWidth();
    window.addEventListener("resize", getScreenWidth);
    return () => {
      window.removeEventListener("resize", getScreenWidth);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: noOfSlides,
    slidesToScroll: 1,
    autoplay: noOfSlides < 4 ? true : false,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <>
      <Banner src={banner?.src} alt={banner?.alt} />
      <div className="p-4">
        <Slider {...settings}>
          {designYourRoom?.map(({ host, url, name, originalname }, indx) => (
            <Link href={`/category/${name.toLowerCase()}`} key={indx}>
              <div className="p-2">
                <div
                  className={
                    "relative h-[280px] md:h-[450px] w-full rounded-2xl overflow-hidden cursor-pointer "
                  }
                >
                  <div className={css.hobbies__name}>{name}</div>
                  <DefaultImage src={host + url} alt={originalname} />
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default DesignYourRoomByHobbies;
