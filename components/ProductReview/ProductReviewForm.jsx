import React, { useState, useCallback, useEffect } from "react";
import css from "./css/product-review.module.css";
import axios from "controllers/axios";

import { BsFillStarFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import DefaultImage from "components/DefaultImage";
import { formatingNumber } from "controllers/otherFunctions";

const ProductReviewForm = ({
  setReviewShow,
  pid,
  orderId,
  setChangeStatus,
}) => {
  const [numOfRating, setNumOfRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [ratingStatus, setRatingStatus] = useState("");

  useEffect(() => {
    switch (numOfRating) {
      case 1:
        return setRatingStatus("Not Satisfied");
      case 2:
        return setRatingStatus("Satisfied");
      case 3:
        return setRatingStatus("Good");
      case 4:
        return setRatingStatus("Very Good");
      case 5:
        return setRatingStatus("Excellent");
      default:
        return setRatingStatus("Not set");
    }
  }, [numOfRating]);

  const getProduct = useCallback(async () => {
    try {
      const get = await axios.get("/getproduct/" + pid);
      if (get.status == 200) {
        setLoading(false);
        return setProduct(get.data[0]);
      }
    } catch (error) {
      setLoading(false);
      console.error(error.response);
      return setProduct({});
    }
  }, [pid]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const sendReview = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const data = {
        order__id: orderId,
        product__id: pid,
        text: reviewText,
        rating: numOfRating,
      };
      const send = await axios.post("/addreview", data);
      if (send.status == 201) {
        setLoading(false);
        alert("Review send successfully.");
        setReviewShow(false);
        return setChangeStatus(Math.random());
      }
    } catch (error) {
      console.error(error);
      return setLoading(false);
    }
  };

  return (
    <>
      <section className={css.productReview}>
        <div className="bg-white p-6 rounded-md relative">
          <div
            className="absolute right-5 top-4 cursor-pointer text-lg hover:text-red-600"
            onClick={() => setReviewShow(false)}
            title="Close"
          >
            <IoClose />
          </div>
          <h2 className="text-lg font-bold mb-3 text-orange-500 capitalize">
            Write your Review
          </h2>
          <form method="post" className={css.reviewForm} onSubmit={sendReview}>
            <div className="flex flex-row gap-4 mb-4 border-b pb-2">
              <div className="revative h-16">
                <DefaultImage
                  src={product?.imageSrc}
                  alt={product?.originalname}
                />
              </div>
              <div className="capitalize text-sm font-bold">
                <div>{product?.title || "None"}</div>
                <div className="text-orange-600">
                  Rs. {formatingNumber(product?.price)}
                </div>
              </div>
            </div>

            <div className={""}>
              <div className={css.formInput}>
                <div className={css.ratingStar}>
                  {Array(5)
                    .fill()
                    .map((val, indx) => (
                      <BsFillStarFill
                        key={indx}
                        className={indx < numOfRating ? css.active : null}
                        onClick={() => setNumOfRating(indx + 1)}
                        onMouseOver={() => setNumOfRating(indx + 1)}
                      />
                    ))}
                </div>
                <div
                  className="text-xs font-bold capitalize "
                  style={{ fontSize: "10px" }}
                >
                  {ratingStatus}
                </div>
              </div>
              <div className={css.formInput}>
                <label htmlFor="">Write your review</label>
                <textarea
                  name=""
                  id=""
                  cols="20"
                  rows="5"
                  placeholder="Write your review words"
                  onChange={(e) => setReviewText(e.target.value)}
                  value={reviewText}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center">
              <button type="submit" className={css.btn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ProductReviewForm;
