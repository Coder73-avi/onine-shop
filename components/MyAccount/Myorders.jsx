import DefaultImage from "components/DefaultImage";
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import css from "./css/myorder.module.css";

import defaultImage from "images/default-image-300x300.png";
import axios from "controllers/axios";
import Loading from "components/Loading";
import MyOrderCard from "components/MyOrderCard";
import ProductReviewForm from "components/ProductReview/ProductReviewForm";

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
  const [reviewShow, setReviewShow] = useState(false);
  const [productid, setProductid] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [changeStatus, setChangeStatus] = useState(0);

  const getOrders = useCallback(async () => {
    try {
      const res = await axios.get(`/getorders`);
      if (res.status == 200) {
        setOrders(res.data);
        return setLoading(false);
      }
    } catch (error) {
      console.error(error);
      return setLoading(false);
    }
  }, [changeStatus]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      {reviewShow ? (
        <ProductReviewForm
          setReviewShow={setReviewShow}
          pid={productid}
          orderId={orderId}
          setChangeStatus={setChangeStatus}
        />
      ) : null}
      <h1 className="p-2 md:p-0 text-lg font-extrabold my-2 text-gray-800">
        My Orders
      </h1>
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
      <section className="  " id={css.orderDiv}>
        <div className="p-4 flex flex-col justify-center gap-6">
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
              return (
                <MyOrderCard
                  val={val}
                  addReview={() => {
                    setReviewShow(true);
                    setOrderId(val?.id);
                    return setProductid(val?.product__id);
                  }}
                  key={indx}
                />
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Myorders;
