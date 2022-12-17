import Breadcrumbs from "components/Breadcrumbs";
import DefaultImage from "components/DefaultImage";
import { sameSiteAxios } from "controllers/axios";
import Head from "next/head";
import Link from "next/link";

import defaultImage from "images/default-image-300x300.png";
import Image from "next/image";

export default function category({ categoryList }) {
  return (
    <>
      <Head>
        <title>Categorys</title>
      </Head>
      <Breadcrumbs location={[{ name: "Categorys", path: "/categorys" }]} />
      {categoryList?.length == 0 ? (
        <div className="text-sm text-gray-600 my-3 mx-4 p-4 border rounded-md">
          0 Category found !!!
        </div>
      ) : null}
      <main>
        <div className=" grid md:grid-cols-4 gap-14 my-8 mx-8 ">
          <div className="relative overflow-hidden">
            <Link href={`/categorys/uncategorized`}>
              <a className="">
                <div className="relative">
                  {/* <DefaultImage /> */}
                  <DefaultImage
                    src={defaultImage}
                    alt={"default-image"}
                    className="rounded-md overflow-hidden"
                  />
                </div>
                <div className="absolute left-0 bottom-0 w-full py-3 bg-teal-800 text-white uppercase text-center text-base rounded-md overflow-hidden">
                  {"Uncategorized"}
                </div>
              </a>
            </Link>
          </div>
          {categoryList?.map((val, indx) => {
            const name = val?.name.toLowerCase().replace(" ", "-");
            return (
              <div key={indx} className="relative overflow-hidden">
                <Link href={`/categorys/${name}`} key={indx}>
                  <a className="">
                    <div className="relative ">
                      {/* <DefaultImage src={val?.imagesrc} /> */}
                      <DefaultImage
                        src={val?.imagesrc || defaultImage}
                        alt={val?.originalname || "default-image"}
                      />
                    </div>
                    <div className="absolute left-0 bottom-0 w-full py-3 bg-teal-800 text-white uppercase text-center text-base rounded-md overflow-hidden">
                      {val.name}
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await sameSiteAxios.get("/categorys");
    if (res.status == 200)
      return { props: { revalidate: 60 * 10, categoryList: res.data } };
    return { props: { categoryList: [] } };
  } catch (error) {
    return { props: { categoryList: [] } };
  }
};
