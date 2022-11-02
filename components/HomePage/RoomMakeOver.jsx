import React from "react";
import css from "./css/roommakeover.module.css";
import YouTube from "react-youtube";
import Image from "next/image";

import coverImage from "images/room-make-over.webp";
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
        <div className="relative w-full h-52 shadow overflow-hidden rounded-md">
          <Image
            src={coverImage}
            alt="default-image"
            layout="fill"
            objectFit="cover"
            objectPosition={"center"}
          />
          <div className="absolute z-50 text-white font-bold text-3xl flex flex-row justify-start items-center w-full h-full px-6">
            Room Make Over
          </div>
        </div>
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
