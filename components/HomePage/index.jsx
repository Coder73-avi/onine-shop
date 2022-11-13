import React from "react";
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

const HomePage = () => {
  const router = useRouter();
  return (
    <>
      <section className="md:w-[90%] lg:container mx-auto grid lg:grid-cols-2 gap-6 my-4">
        <div className="col-span-1 grid md:grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <div
              className={`h-64 lg:h-52 relative rounded-2xl overflow-hidden ${css.image__div}`}
              onClick={() => router.push("/category")}
            >
              <div className={css.home__text}>CATEGORY</div>
              <Image
                src={category}
                alt="images"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div
              className={`h-64 lg:h-52 relative rounded-2xl overflow-hidden ${css.image__div}`}
              onClick={() => router.push("/shop")}
            >
              <div className={css.home__text}>VASE</div>
              <Image src={vase} alt="images" layout="fill" objectFit="cover" />
            </div>
          </div>

          <div className="col-span-1">
            <div
              className={`h-full w-full relative rounded-2xl overflow-hidden ${css.image__div}`}
              onClick={() => router.push("/ideas")}
            >
              <div className={css.home__text}>IDEAS</div>
              <Image src={ideas} alt="images" layout="fill" objectFit="cover" />
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            <div
              onClick={() => router.push("/shop")}
              className={`h-64 lg:h-52 relative rounded-2xl overflow-hidden ${css.image__div}`}
            >
              <div className={css.home__text}>SHOP</div>
              <Image src={shop} alt="images" layout="fill" objectFit="cover" />
            </div>
            <div
              className={`h-64 lg:h-52 relative rounded-2xl overflow-hidden ${css.image__div}`}
              onClick={() => router.push("/another")}
            >
              <div className={css.home__text}>ANOTHER</div>
              <Image
                src={another}
                alt="images"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <div className="col-span-3">
            <div
              className={`h-52 relative rounded-2xl overflow-hidden ${css.image__div}`}
              onClick={() => router.push("/bed")}
            >
              <div className={` ${css.home__text}`}>
                <span className="text-4xl">BED</span>
              </div>
              <Image src={bed} alt="images" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative h-full rounded-2xl overflow-hidden">
            <Image
              src={sliderimage}
              alt="slider-images"
              objectFit="cover"
              layout="fill"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
