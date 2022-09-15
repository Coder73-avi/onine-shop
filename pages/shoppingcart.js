import Breadcrumbs from "components/Breadcrumbs";
import DefaultImage from "components/DefaultImage";
import { useStateValue } from "controllers/Reducer/stateProvider";
import Head from "next/head";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import css from "styles/Shoppingcart.module.css";

export default function Shoppingcart() {
  const [{ cart }, dispatch] = useStateValue();
  console.log(cart);
  const tableHeading = [
    "Image",
    "Product",
    "Price",
    "Quantity",
    "Total",
    "Remove",
  ];
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <Breadcrumbs
        location={[{ name: "Shoping Cart", path: "/shoppingcart" }]}
      />
      <main className="w-[90%] mx-auto">
        <h2 className={css.shoppingcart__head}>Shopping Cart Summery </h2>
        <hr />

        <table className="w-full text-left my-6">
          <thead className="text-center">
            <tr>
              {tableHeading.map((val, indx) => (
                <th key={indx} scope="col" className="px-2 py-4 border">
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {cart?.map((val, indx) => (
              <tr key={indx} className="">
                <td className="px-2 py-4 border w-[200px]">
                  {/* <DefaultImage src={val?.imgSrc} alt="cart-image" /> */}
                  <div className="relative">
                    <Image
                      src={val.imgSrc}
                      alt="shoppingcart"
                      height={120}
                      width={200}
                    />
                  </div>
                </td>
                <td className="px-2 py-4 border">{val?.title}</td>
                <td className="px-2 py-4 border">{val?.price}</td>
                <td className="px-2 py-4 border">{val?.qty}</td>
                <td className="px-2 py-4 border">
                  Rs.
                  {" " + parseInt(val?.price) * parseInt(val?.qty)}
                </td>
                <td className="px-2 py-4 border ">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <IoClose />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
