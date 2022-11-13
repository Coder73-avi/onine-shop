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
        <div className="relative w-full md:h-36 lg:h-52 shadow overflow-hidden rounded-md">
          <Image
            src={coverImage}
            alt="default-image"
            layout="fill"
            objectFit="cover"
            objectPosition={"center"}
          />
          <div className="absolute z-50 text-white font-bold text-lg lg:text-3xl flex flex-row justify-start items-center w-full h-full px-6">
            Room Make Over
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 md:px-4 lg:p-0 my-4 lg:justify-center items-center mx-auto">
          <div className="p-4 overflow-hidden rounded-2xl col-span-3 lg:col-span-1">
            <video controls autoPlay={true} loop muted>
              <source src={"./videos/furniture-1.mp4"} type="video/mp4" />
            </video>
          </div>

          <div className="col-span-3 lg:col-span-1 grid grid-cols-2 gap-4">
            {Array(4)
              .fill()
              .map((val, indx) => (
                <div
                  key={indx}
                  className="relative rounded-xl overflow-hidden "
                >
                  {/* <DefaultImage
                    src={roommakeover}
                    alt="room make over"
                    className={`shadow-xl`}
                  /> */}
                  <video autoPlay={true} loop muted>
                    <source src={"./videos/furniture-2.mp4"} type="video/mp4" />
                  </video>
                </div>
              ))}
          </div>
          <div className="col-span-3 lg:col-span-1">
            <div className="relative rounded-xl overflow-hidden ">
              {/* <DefaultImage src={roommakeover} alt="room make over" /> */}
              <video controls autoPlay={true} loop muted>
                <source src={"./videos/furniture-3.mp4"} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoomMakeOver;
