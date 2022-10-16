import DefaultImage from "components/DefaultImage";
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import css from "./css/myorder.module.css";

import demoimage from "images/default-image-300x300.png";
import axios from "controllers/axios";
import { useStateValue } from "controllers/Reducer/stateProvider";

const Myorders = () => {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOrders = useCallback(async () => {
    try {
      const id = user?.id;
      const res = await axios.get(`/getorders/${id}`);
      if (res.status == 200) {
        setOrders(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) getOrders();
  }, [getOrders, user?.id]);

  return (
    <>
      <h1 className="text-lg font-extrabold my-2 text-gray-800">My Orders</h1>
      <hr className="mb-4" />

      <section className=" p-4 flex flex-col justify-center gap-6">
        {loading && <div>Loading...</div>}
        {orders?.map((val, indx) => {
          const date = new Date(val.date);
          return (
            <div className={css.orderCard} key={indx}>
              <div className="text-gray-600 text-xs flex flex-row justify-between items-center">
                <div>#Order Id : {val?.id}</div>
                <div>{moment.unix(date).format("MMMM DD YYYY, hh:mm a")}</div>
              </div>
              <div className="grid grid-cols-3 px-3 pt-4 pb-1 gap-8">
                <div className="col-span-1 relative">
                  <DefaultImage src={demoimage} alt="product-image" />
                </div>
                <div className="col-span-2 text-gray-800 pt-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-md font-bold capitalize">
                      {val?.title}
                    </h2>
                    <h3 className="text-sm font-bold">Rs. {val?.price}</h3>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <span className="text-xs italic capitalize text-teal-700">
                      Status: {val?.status}
                    </span>
                    <button className="text-sm  font-bold hover:text-teal-700">
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
