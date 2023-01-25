import axios from "controllers/axios";
import DefaultImage from "components/DefaultImage";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

const CommunityOrders = () => {
  const [billingAddress, setBillingAddress] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrderList = useCallback(async () => {
    try {
      const req = await axios.get("/getcommunityorders");
      if (req?.status == 200) {
        const { data, payment__method } = req;
        setOrderList(data);
        const { title, price, url } = data[0];
        setProductDetails({ title, price, url, payment__method });
        setBillingAddress(data[0]?.address);

        console.log(req.data);
        return setLoading(false);
      }
    } catch (error) {
      return setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrderList();
    console.log(billingAddress, productDetails, orderList);
  }, [getOrderList]);

  return (
    <div>
      <h1 className="text-lg font-bold pb-3">Community Orders</h1>
      <hr />

      <div className="grid md:grid-cols-5 gap-3 pt-3">
        <div className="col-span-3 pr-2 border-r">
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400s">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Id
                </th>
                <th scope="col" className="px-2 py-3">
                  Product Title
                </th>
                <th scope="col" className="px-2 py-3">
                  Status
                </th>
                <th scope="col" className="px-2 py-3">
                  Price
                </th>
                <th scope="col" className="px-2 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orderList.map(
                (
                  {
                    id,
                    title,
                    price,
                    status,
                    date,
                    address,
                    url,
                    payment__method,
                  },
                  indx,
                ) => {
                  return (
                    <tr
                      key={indx}
                      onClick={() => {
                        setBillingAddress(address);
                        return setProductDetails({
                          title,
                          price,
                          url,
                          payment__method,
                        });
                      }}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                      <th
                        scope="row"
                        className="px-2 py-3 font-semibold text-gray-700 whitespace-nowrap dark:text-white"
                      >
                        {id}
                      </th>
                      <th
                        scope="row"
                        className="px-2 py-3 font-semibold text-gray-700 dark:text-white capitalize"
                      >
                        {title.slice(0, 20)} . . .
                      </th>
                      <td className="px-2 py-3">{status}</td>
                      <td className="px-2 py-3">{price}</td>
                      <td className="px-2 py-3">
                        {moment.utc(new Date(date)).fromNow()}
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
        <div className="col-span-2 flex flex-col w-full gap-4">
          <div className="border p-4">
            <h2 className="font-bold pb-1 text-center text-teal-700">
              Billing Address:{" "}
            </h2>
            <hr className="w-[70%] mx-auto mb-4" />
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="font-bold">{billingAddress?.fullname}</div>
              <div>
                {billingAddress?.region + " "}
                {billingAddress?.city + " "}
                {billingAddress?.street + " "}
                {billingAddress?.area + " "}
                {billingAddress?.colony + " "}
                {billingAddress?.address}
              </div>
              <div className="">
                <b>Phone Number </b>: {billingAddress?.phonenumber}
              </div>
            </div>
          </div>
          <div className="border p-4">
            <h2 className="font-bold pb-1 text-center text-teal-700">
              Product Details:{" "}
            </h2>
            <hr className="w-[70%] mx-auto mb-4" />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <DefaultImage src={productDetails?.url} />
              </div>
              <div className="text-xs text-gray-700 flex flex-col gap-4">
                <div className="font-bold capitalize">
                  {productDetails?.title}
                </div>
                <div className="grid md:grid-cols-2 gap-1">
                  <div>Price : </div>
                  <div>Rs. {productDetails?.price}</div>
                  <div>Delivery Charge (+)</div>
                  <div>Rs. 100</div>
                  <div className="col-span-2 border-b"></div>
                  <div className="font-bold">Total : </div>
                  <div>Rs. {parseInt(productDetails?.price) + 100}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end mt-4">
              <div className=" p-2 bg-green-500 text-white text-xs">
                Payment Method :{" "}
                <b className="uppercase">{productDetails?.payment__method}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityOrders;
