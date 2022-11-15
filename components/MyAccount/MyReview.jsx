import ProductReviewForm from "components/ProductReview/ProductReviewForm";
import React, { useState, useCallback, useEffect } from "react";
import axios from "controllers/axios";
import Loading from "components/Loading";
import moment from "moment";
import MyOrderCard from "components/MyOrderCard";

const MyReview = () => {
  const [pid, setPid] = useState(123);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <>
      <h1 className="text-lg font-extrabold my-2 text-gray-800">My Review</h1>

      {loading && <Loading />}
      {!loading && orders?.length == 0 ? (
        <div className="text-sm text-gray-600">
          Orders are not completed yet !!!
        </div>
      ) : null}
      <div className="">
        
      </div>
    </>
  );
};

export default MyReview;
