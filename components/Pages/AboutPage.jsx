import React from "react";
import css from "./css/about.module.css";

import { AiOutlineClockCircle, AiOutlineShopping } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import Slider from "react-slick";
import DefaultImage from "components/DefaultImage";
import PageBanner from "./PageBanner";

import aboutImage from "images/ABOUT-US-BANNER.jpg";

const AboutPage = ({ brands }) => {
  const aboutInfo = [
    {
      icon: <AiOutlineShopping />,
      name: "Shoping Now",
      discription:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.",
    },
    {
      icon: <FaShippingFast />,
      name: "Fast Shiping",
      discription:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.",
    },
    {
      icon: <AiOutlineClockCircle />,
      name: "Return Policy",
      discription:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.",
    },
    {
      icon: <AiOutlineShopping />,
      name: "Payment Methods",
      discription:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo consequat.",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoplay: true,
    cssEase: "linear",
  };

  return (
    <section className={css.about_page}>
      <PageBanner bgImage={aboutImage} />
      <div className="bg-white py-20">
        <div className="w-full md:w-[80%] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-3">
          {aboutInfo.map(({ icon, name, discription }, indx) => (
            <div className={" text-gray-700 " + css.about_info_card} key={indx}>
              <div className="flex flex-row gap-4 items-center text-gray-800">
                <div className="text-4xl ">{icon}</div>
                <div className="text-lg font-semibold">{name}</div>
              </div>
              <div className="text-sm text-left">{discription}</div>
            </div>
          ))}
        </div>
      </div>

      {/* brand carousel */}
      <div className=" bg-white pb-8">
        <h1 className="text-center font-bold text-xl py-6 text-gray-800">
          Trusted Brands
        </h1>
        <div className="w-full md:w-[70%] mx-auto">
          <Slider {...settings}>
            {brands?.map(({ logo, originalname }, indx) => {
              return (
                <div
                  key={indx}
                  className="p-2 flex flex-col justify-center items-center h-[100px] min-w-[100px] overflow-hidden"
                >
                  <div className="flex flex-row justify-center items-center h-full w-full">
                    <div className="relative h-[100px] ">
                      <DefaultImage src={logo} alt={originalname} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
