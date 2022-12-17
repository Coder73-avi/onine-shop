import DefaultImage from "components/DefaultImage";
import { Card } from "components/HomePage/NewProductList";
import { formatingNumber } from "controllers/otherFunctions";
import { useStateValue } from "controllers/Reducer/stateProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CheckOutCommunityProduct from "./CheckOutCommunityProduct";
import css from "./css/CommunityPostDetails.module.css";

const CommunityPostDetails = ({ data, topSelling }) => {
  const {user} = useStateValue();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const [forSale, setForSale] = useState(false);
  const [sendOrder, setSendOrder] = useState(false);

  useEffect(() => {
    const url = data.host + data.imageSrc[0].url;
    setImageUrl(url);
  }, [data.host, data.imageSrc]);

  useEffect(() => {
    const saleStatus = data?.type;
    if (saleStatus == "onsale" && data?.status == "onsale") {
      setForSale(true);
    } else {
      setForSale(false);
    }
  }, [data?.type]);

  const orderSend = () =>{
    if(!user) {
      alert("Plz login first !!!")
      return router.push("/login")
    }
    return sendOrder(true)
  }

  return (
    <>
      {sendOrder ? (
        <CheckOutCommunityProduct
          data={data}
          setSendOrder={setSendOrder}
          sendOrder={sendOrder}
        />
      ) : null}
      <section className="container mx-auto my-4">
        {/* main Head */}
        <div className="grid md:grid-cols-4 gap-5">
        <div className=" col-span-4 lg:col-span-3 flex flex-row gap-4 lg:gap-10">
          <div className="border px-4 pt-4 rounded-md">
            <div className=" overflow-hidden rounded-md min-w-[250px] lg:min-w-[400px] border">
              <DefaultImage src={imageUrl} alt="main-images" />
            </div>
            <div className="max-w-[400px] flex flex-row gap-8 my-3 overflow-x-auto">
              {data?.imageSrc?.map((val, indx) => {
                const url = data?.host + val?.url;
                return (
                  <div
                    className="relative h-[100px] min-w-[120px] rounded-lg overflow-hidden cursor-pointer hover:opacity-50 transition"
                    key={indx}
                    onClick={() => setImageUrl(url)}
                  >
                    <Image
                      src={url}
                      alt={val.originalname}
                      layout="fill"
                      objectFit="cover"
                      objectPosition={"center"}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-2 justify-center  px-2">
            <h1 className="text-lg lg:text-3xl font-bold text-justify">
              {data.title}
            </h1>
            {forSale ? (
              <h2 className="text-xl font-bold text-blue-900">
                Rs. {formatingNumber(data.price)}
              </h2>
            ) : null}
            <article>
              <h3 className="text-sm font-bold text-gray-700">
                Discription :{" "}
              </h3>
              <p className="text-sm text-gray-800 text-justify mt-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati eaque exercitationem corrupti nobis harum at hic
                inventore, nostrum delectus minus sequi dignissimos. Ullam,
                iusto dolorum? Non eum sed dolor voluptatibus.
              </p>
            </article>
            {forSale ? (
              <button
                type="button"
                className={css.orderNowBtn}
                onClick={orderSend}
              >
                Order Now !
              </button>
            ) : null}

            {data?.status == "sold" ? (
              <button type="button" className={css.soldOut}>
                Sold Out !!
              </button>
            ) : null}
          </div>
        </div>
        <div className="col-span-1 hidden lg:block" >
        <h2 className="font-bold ">Top Selling</h2>
          {topSelling?.map((val, indx) => (
            <Card
              key={indx}
              pid={val?.pid}
              imgSrc={val?.imageSrc}
              originalName={val?.originalname}
              title={val?.title}
              price={val?.price}
            />
          ))}
        </div>
        </div>
      </section>
    </>
  );
};

export default CommunityPostDetails;
