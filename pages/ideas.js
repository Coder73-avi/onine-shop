import Head from "next/head";
import { sameSiteAxios } from "controllers/axios";
import DefaultImage from "components/DefaultImage";
import Breadcrumbs from "components/Breadcrumbs";
import Link from "next/link";

export default function ideas({ imageList }) {
  return (
    <>
      <Head>
        <title>Ideas</title>
      </Head>
      <Breadcrumbs location={[{ name: "Ideas", path: "/ideas" }]} />
      <main>
        {imageList?.length == 0 ? (
          <div className="text-sm text-gray-600 my-3 mx-4 p-4 border rounded-md">
            0 Images found !!!
          </div>
        ) : null}
        <div className="w-[90%] mx-auto mt-4 mb-10 columns-2 lg:columns-4 gap-10 ">
          {imageList?.map((image, indx) => {
            return (
              <div
                key={indx}
                className="overflow-hidden rounded-md shadow-lg mb-8"
              >
                <Link
                  href={`/productdetails/${image.title?.replaceAll(" ", "_")}`}
                >
                  <a>
                    <DefaultImage src={image?.url} alt={image?.originalname} />
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
    const req = await sameSiteAxios.get("/getallimages");
    return { props: { revalidate: 60 * 20, imageList: req.data } };
  } catch (error) {
    // console.log(error);
    return { props: { imageList: [] } };
  }
};
