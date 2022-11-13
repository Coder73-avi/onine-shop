import React from "react";
import DefaultImage from "components/DefaultImage";
import demoimage from "images/default-image-300x300.png";
import { removeItemFromCart } from "controllers/cartControl";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { useRouter } from "next/router";
import { formatingNumber } from "controllers/otherFunctions";

const OrderDetails = () => {
  const router = useRouter();
  const [{ carts }, dispatch] = useStateValue();
  const [orders, setOrders] = React.useState([]);
  return (
    <section className=" p-4 rounded-md">
      <div className="flex flex-col gap-3">
        {carts?.map((val, indx) => {
          const subtotal = parseInt(val?.price) * parseInt(val?.qty);
          return (
            <div className={`border w-full rounded-md`} key={indx}>
              <div className="grid grid-cols-3 px-3 py-2 lg:py-4 gap-8">
                <div className="col-span-1 relative">
                  <DefaultImage
                    src={val?.imageSrc || demoimage}
                    alt="product-image"
                  />
                </div>
                <div className="col-span-2 text-gray-800 pt-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm lg:text-lg font-bold capitalize">
                      {val?.title}
                    </h2>
                    <div className="text-sm lg:text-lg flex flex-col items-end justify-between mt-6">
                      <h3 className="font-bold">
                        Rs. {formatingNumber(val?.price)}
                      </h3>
                      <h3 className="italic text-teal-700">Qty : {val?.qty}</h3>
                    </div>
                  </div>
                  <div className="text-xs lg:text-sm flex flex-col justify-end items-end">
                    <span className=" italic capitalize text-teal-700">
                      Sub Total : Rs. {formatingNumber(subtotal)}
                    </span>
                    <button
                      className="  text-red-500 italic hover:text-red-600 "
                      onClick={async () => {
                        await removeItemFromCart(val?.id, val?.qty);
                        dispatch({ type: "UPDATE__CART" });
                        return router.push("/checkout");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OrderDetails;
