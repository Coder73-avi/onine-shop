import React, { useState, useCallback, useEffect } from "react";
import axios from "controllers/axios";
import Loading from "components/Loading";
import moment from "moment";
import DefaultImage from "components/DefaultImage";
import ProductRating from "components/ProductRating";
import Link from "next/link";

const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReviews = useCallback(async () => {
    try {
      const res = await axios.get(`/getreviewsforuser`);
      if (res.status == 200) {
        setReviews(res.data);
        console.log(reviews);
        return setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getReviews();
  }, [getReviews]);
  return (
    <>
      <h1 className="text-lg font-extrabold my-2 text-gray-800  ">My Review</h1>

      <hr className="my-3" />

      {loading && <Loading />}
      {!loading && reviews?.length == 0 ? (
        <div className="text-sm text-gray-600">
          Reviews are not made yet.{" "}
          <Link href="/shop">
            <a className="text-blue-600 underline">Order somthing</a>
          </Link>{" "}
          !!!
        </div>
      ) : null}
      <div className="">
        {reviews?.map((val, indx) => (
          <div key={indx}>
            <div className="flex flex-row item-center gap-6 border p-4 rounded-lg w-full lg:w-[60%] mb-6">
              <div className="relative w-20">
                <DefaultImage
                  src={val?.product?.imageSrc}
                  alt={val?.product?.orginalname}
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  {val?.product?.title}
                </h2>
                <ProductRating maxRating={parseInt(val?.rating)} />
                <article className="text-sm text-gray-800 py-2">
                  {val?.text}
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyReview;
