import React from "react";
import css from "./css/roommakeover.module.css";
import YouTube from "react-youtube";
import Image from "next/image";

import roommakeover from "images/home/roommakeover.avif";
import DefaultImage from "components/DefaultImage";

const RoomMakeOver = () => {
  const opts = {
    width: "400",
    height: "220",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <section className="">
        <div
          className={`grid md:grid-cols-2 justify-center items-center ${css.roommakeover}`}
        >
          <div className={css.roommakeover__info} data-aos="zoom-in">
            <h1 className={css.title}>Room Make Over</h1>
            <article className="text-sm text-justify">
              Interior design is the art and science of enhancing the interior
              of a building to achieve a healthier and more aesthetically
              pleasing environment for the people using the space. An interior
              designer is someone who plans, researches, coordinates, and
              manages such enhancement projects.
            </article>
            <button>Get Start</button>
          </div>
        </div>

        <div className="hidden md:block"></div>

        <div className="grid md:grid-cols-3 gap-8 my-14 justify-center items-center mx-auto">
          <div className="p-4 overflow-hidden rounded-2xl ">
            <YouTube videoId="2g811Eo7K8U" opts={opts} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {Array(4)
              .fill()
              .map((val, indx) => (
                <div
                  key={indx}
                  className="relative rounded-xl overflow-hidden h-28"
                >
                  <DefaultImage
                    src={roommakeover}
                    alt="room make over"
                    className={`shadow-xl`}
                  />
                </div>
              ))}
          </div>
          <div>
            <div
              className="relative rounded-xl overflow-hidden"
              data-aos="fade-up"
            >
              <DefaultImage src={roommakeover} alt="room make over" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoomMakeOver;
