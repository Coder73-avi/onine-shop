import DefaultImage from "components/DefaultImage";
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import css from "./css/myorder.module.css";

import defaultImage from "images/default-image-300x300.png";
import axios from "controllers/axios";
import Loading from "components/Loading";

const filterBtn = [
  {
    name: "all",
    value: "",
  },
  {
    name: "processing",
    value: "processing",
  },
  {
    name: "shipping",
    value: "shipping",
  },
  {
    name: "completed",
    value: "completed",
  },
  {
    name: "cancelled",
    value: "cancelled",
  },
];

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  const getOrders = useCallback(async () => {
    try {
      const res = await axios.get(`/getorders`);
      if (res.status == 200) {
        setOrders(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const addReview = () => {};

  return (
    <>
      <h1 className="text-lg font-extrabold my-2 text-gray-800">My Orders</h1>
      <hr className="mb-4" />
      {loading && <Loading />}
      {!loading && orders?.length == 0 ? (
        <div className="text-sm text-gray-600">Orders is not found !!!</div>
      ) : (
        <div className={css.order__status__btns}>
          {filterBtn?.map((val, indx) => (
            <button
              onClick={() => setFilterStatus(val.value)}
              key={indx}
              className={val.value == filterStatus ? css.active : ""}
            >
              {val.name}
            </button>
          ))}
        </div>
      )}
      <section className=" p-4 flex flex-col justify-center gap-6">
        {orders
          ?.filter((item) => {
            if (filterStatus == "") {
              return item;
            }
            if (
              item.status.toLowerCase().includes(filterStatus.toLowerCase())
            ) {
              return item;
            }
          })
          ?.map((val, indx) => {
            const date = new Date(val.date);
            return (
              <div className={css.orderCard} key={indx}>
                <div className="text-gray-600 text-xs flex flex-row justify-between items-center">
                  <div>#Order Id : {val?.id}</div>
                  <div>{moment.utc(date).format("MMMM DD YYYY, hh:mm a")}</div>
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
                      <h2 className="text-md font-bold capitalize">
                        {val?.title}
                      </h2>
                      <div className="flex flex-row items-center justify-between">
                        <h3 className="text-sm font-bold">Rs. {val?.price}</h3>
                        <h3 className="text-sm italic text-teal-700">
                          Qty : {val?.qty}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <span className="text-xs italic capitalize text-teal-700">
                        Status: {val?.status}{" "}
                      </span>
                      <button
                        onClick={addReview}
                        disabled={
                          val?.status?.toLowerCase() !== "completed"
                            ? true
                            : false
                        }
                        className="text-sm  font-bold hover:text-teal-700 disabled:hover:text-gray-700 disabled:opacity-30"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default Myorders;
