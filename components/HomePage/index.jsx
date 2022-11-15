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
      <section className="w-[90%] lg:container mx-auto grid lg:grid-cols-2 gap-6 my-4">
        <div className="col-span-1 grid md:grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            <Link href="/categorys">
              <a
                className={`h-36 md:h-64 relative rounded-2xl overflow-hidden ${css.image__div}`}
              >
                <div className={css.home__text}>CATEGORY</div>
                <Image
                  src={category}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
            <Link href="/shop">
              <a
                className={`h-36 md:h-64 relative rounded-2xl overflow-hidden ${css.image__div}`}
              >
                <div className={css.home__text}>VASE</div>
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
              <div
                className={`h-full w-full relative rounded-2xl overflow-hidden ${css.image__div}`}
              >
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
              <a
                className={`h-36 md:h-64 relative rounded-2xl overflow-hidden ${css.image__div}`}
              >
                <div className={css.home__text}>SHOP</div>
                <Image
                  src={shop}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
            <Link href="/another">
              <a
                className={`h-36 md:h-64 relative rounded-2xl overflow-hidden ${css.image__div}`}
              >
                <div className={css.home__text}>ANOTHER</div>
                <Image
                  src={another}
                  alt="images"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </div>
          <Link href="/bed">
            <a className="col-span-3">
              <div
                className={`h-32 md:h-40 lg:h-48 relative rounded-2xl overflow-hidden ${css.image__div}`}
              >
                <div className={` ${css.home__text}`}>
                  <span className="text-2xl lg:text-3xl">BED</span>
                </div>
                <Image src={bed} alt="images" layout="fill" objectFit="cover" />
              </div>
            </a>
          </Link>
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
