import DefaultImage from "components/DefaultImage";
import React from "react";
import css from "./style.module.css";
import defaultImage from "images/default-image-300x300.png";
import moment from "moment";
import { formatingNumber } from "controllers/otherFunctions";

const MyOrderCard = ({ val, addReview = false, review = false }) => {
  return (
    <div
      className={`cursor-pointer border rounded-sm  px-4 py-2 w-[95%] ${
        review ? " " : "md:w-[60%]"
      } hover:bg-gray-200 duration-200`}
    >
      <div className="text-gray-600 text-xs flex flex-row justify-between items-center">
        <div>#Order Id : {val?.id}</div>
        <div>
          {moment.utc(new Date(val?.date)).format("MMMM DD YYYY, hh:mm a")}
        </div>
      </div>
      <div className="grid grid-cols-3 px-3 pt-4 pb-1 gap-8">
        <div className="col-span-1 relative">
          <DefaultImage
            src={val?.imageSrc || defaultImage}
            alt={val?.originalname || "product-image"}
          />
        </div>
        <div className="col-span-2 text-gray-800 pt-1 flex flex-col justify-between">
          <div>
            <h2
              className={`${
                review ? "text-sm" : "text-md"
              } font-bold capitalize`}
            >
              {val?.title}
            </h2>
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-sm font-bold text-teal-700">
                Rs. {formatingNumber(val?.price)}
              </h3>
              <h3 className="text-sm italic text-teal-700">Qty : {val?.qty}</h3>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <span className="text-xs italic capitalize text-teal-700">
              Status: {val?.status}{" "}
            </span>
            {review ? null : (
              <button
                onClick={addReview}
                disabled={
                  val?.status?.toLowerCase() !== "completed" ||
                  val?.review !== "0"
                    ? true
                    : false
                }
                className="text-sm mt-3  font-bold hover:text-teal-700 disabled:hover:text-gray-700 disabled:opacity-30"
              >
                Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderCard;
