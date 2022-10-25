import React from "react";
import DefaultImage from "components/DefaultImage";
import demoimage from "images/default-image-300x300.png";
import { removeItemFromCart } from "controllers/cartControl";
import { useStateValue } from "controllers/Reducer/stateProvider";
import { useRouter } from "next/router";

const OrderDetails = () => {
  const router = useRouter();
  const [{ carts }, dispatch] = useStateValue();
  return (
    <section className="my-4 border p-4 rounded-md">
      <div className="flex flex-col gap-3">
        {carts?.map((val, indx) => {
          return (
            <div className={`border w-full p-2 rounded-md`} key={indx}>
              <div className="grid grid-cols-3 px-3 pt-4 pb-1 gap-8">
                <div className="col-span-1 relative">
                  <DefaultImage
                    src={val?.imageSrc || demoimage}
                    alt="product-image"
                  />
                </div>
                <div className="col-span-2 text-gray-800 pt-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-md font-bold capitalize">
                      {val?.product?.title}
                    </h2>
                    <div className="flex flex-row items-center justify-between">
                      <h3 className="text-sm font-bold">
                        Rs. {val?.product?.price}
                      </h3>
                      <h3 className="text-sm italic text-teal-700">
                        Qty : {val?.qty}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end">
                    <span className="text-sm italic capitalize text-teal-700">
                      Sub Total :{" "}
                      {parseInt(val?.product?.price) * parseInt(val?.qty)}
                    </span>
                    <button
                      className="text-sm  text-red-500 italic hover:text-red-600 "
                      onClick={async () => {
                        await removeItemFromCart(val?.id);
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
