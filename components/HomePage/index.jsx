import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import css from "./css/style.module.css";

import sliderimage from "images/sliderimages/chair-removebg.png";
import bed from "images/home/bed.jpg";
import ideas from "images/home/ideas.jpg";
import category from "images/home/category.jpg";
import vase from "images/home/vase.jpg";
import another from "images/home/another.jpg";
import shop from "images/home/shop.jpg";
import { useRouter } from "next/router";
import Slider from "react-slick";
import DefaultImage from "components/DefaultImage";

const HomePage = ({ sliderImages }) => {
  const router = useRouter();
  const [sliderDivHeight, setSliderDivHeight] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    cssEase: "linear",
  };

  const getSliderDivHeigth = useCallback(() => {
    const sliderDiv = document.getElementById("slider__div");
    return setSliderDivHeight(sliderDiv.offsetHeight);
  }, []);

  useEffect(() => {
    getSliderDivHeigth();
    addEventListener("resize", getSliderDivHeigth);
    return () => removeEventListener("resize", getSliderDivHeigth);
  }, [getSliderDivHeigth]);

  return (
    <>
      <section className="w-[90%] lg:container mx-auto grid lg:grid-cols-2 gap-6 my-4">
        <div className="col-span-1 grid md:grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <Link href="/categorys">
              <a className={` ${css.image__div}`}>
                <div className={css.home__text}>CATEGORY</div>
                <Image
                  src={category}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
            <Link href="/categorys/plants">
              <a className={` ${css.image__div}`}>
                <div className={css.home__text}>Plants</div>
                <Image
                  src={vase}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </div>
          <Link href="/ideas">
            <a className="col-span-1">
              <div className={` ${css.image__div} `} style={{ height: "100%" }}>
                <div className={css.home__text}>IDEAS</div>
                <Image
                  src={ideas}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </a>
          </Link>

          <div className="col-span-1 flex flex-col gap-4">
            <Link href="/shop">
              <a className={`${css.image__div}`}>
                <div className={css.home__text}>SHOP</div>
                <Image
                  src={shop}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
            <Link href="/ourcommunity">
              <a className={` ${css.image__div}`}>
                <div className={`${css.home__text}`}>
                  <span className="text-center">Our Community</span>
                  <span className="text-xs text-center font-bold text-red-600 capitalize">
                    sales. buy. share.
                  </span>
                </div>
                <Image
                  src={another}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </div>
          <Link href="/search/bed">
            <a className="col-span-3">
              <div className={`${css.image__div} ${css.lastImage}`}>
                <div className={` ${css.home__text}`}>
                  <span className="text-2xl lg:text-3xl">BED</span>
                </div>
                <Image src={bed} alt="images" layout="fill" objectFit="cover" />
              </div>
            </a>
          </Link>
        </div>

        <div className="col-span-1 hidden lg:block " id="slider__div">
          <Slider {...settings}>
            {sliderImages?.map(({ host, url, originalname }, indx) => {
              const imgSrc = host + url;
              return (
                <div key={indx} className="">
                  <div
                    className={
                      css.slider__image + " overflow-hidden rounded-md"
                    }
                    style={{ height: `${sliderDivHeight}px` }}
                  >
                    <Image
                      src={imgSrc || sliderimage}
                      alt={originalname}
                      layout="fill"
                      objectFit="cover"
                      objectPosition={"center"}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default HomePage;
