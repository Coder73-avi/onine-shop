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
        <div className=" grid md:grid-cols-4 gap-4 mx-4 my-6">
          <div>
            <Link href={`/categorys/uncategorized`}>
              <a>
                <div className="relative rounded-md overflow-hidden h-20 shadow-lg">
                  {/* <DefaultImage /> */}
                  <Image
                    src={defaultImage}
                    alt={"default-image"}
                    layout="fill"
                    objectFit={"cover"}
                    objectPosition="center"
                  />
                </div>
              </a>
            </Link>
          </div>
          {categoryList?.map((val, indx) => {
            const name = val?.name.toLowerCase().replace(" ", "-");
            return (
              <div key={indx}>
                <Link href={`/categorys/${name}`} key={indx}>
                  <a>
                    <div className="relative rounded-md overflow-hidden h-20 shadow-lg">
                      {/* <DefaultImage src={val?.imagesrc} /> */}
                      <Image
                        src={val?.imagesrc || defaultImage}
                        alt={val?.originalname || "default-image"}
                        layout="fill"
                        objectFit={"cover"}
                        objectPosition="center"
                      />
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
    if (res.status == 200) return { props: { categoryList: res.data } };
    return { props: { categoryList: [] } };
  } catch (error) {
    return { props: { categoryList: [] } };
  }
};
