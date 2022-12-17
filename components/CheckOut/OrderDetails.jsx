import React, { useEffect } from "react";
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
  useEffect(() => {
    const trys = "turue";
    console.log(trys.slice(1, 1));
  }, []);
  return (
    <section className=" rounded-md">
      <div className="flex flex-col gap-3">
        {carts?.map((val, indx) => {
          const subtotal = parseInt(val?.price) * parseInt(val?.qty);
          return (
            <div className={`border w-full rounded-md`} key={indx}>
              <div className="flex flex-row px-3 py-2 lg:py-4 gap-8">
                <div className="flex-grow-0 relative w-[150px] h-full">
                  <DefaultImage
                    src={val?.imageSrc || demoimage}
                    alt="product-image"
                  />
                </div>
                <div className="flex-grow text-gray-800 pt-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm lg:text-lg font-bold capitalize">
                      {val?.title}
                    </h2>
                    <h3 className="font-bold text-teal-700">
                      Rs. {formatingNumber(val?.price)}
                    </h3>
                    <div className="text-sm lg:text-base flex flex-col items-end justify-between mt-6">
                      <h3 className="italic text-teal-700">Qty : {val?.qty}</h3>
                    </div>
                  </div>
                  <div className="text-xs lg:text-sm flex flex-col justify-end items-end">
                    <span className=" italic capitalize text-teal-700">
                      Sub Total : Rs. {formatingNumber(subtotal)}
                    </span>
                    <button
                      className="  text-red-500 italic hover:text-red-600 text-sm "
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
