import ProductRating from "components/ProductRating";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import css from "./css/moredetails.module.css";
import axios from "controllers/axios";
import Loading from "components/Loading";

const MoreDetails = () => {
  const [navState, setNavState] = useState("more-info");
  return (
    <>
      <div className={css.nav}>
        <div
          className={`${css.navList} ${
            navState == "more-info" ? css.active : ""
          }`}
          onClick={() => setNavState("more-info")}
        >
          More Info
        </div>
        <div
          className={`${css.navList} ${
            navState == "data-sheet" ? css.active : ""
          }`}
          onClick={() => setNavState("data-sheet")}
        >
          Data sheet
        </div>
        <div
          className={`${css.navList} ${navState == "review" ? css.active : ""}`}
          onClick={() => setNavState("review")}
        >
          review
        </div>
      </div>

      <div className="border p-8 my-5">
        {navState == "more-info" && <MoreInfo />}
        {navState == "data-sheet" && <DataSheet />}
        {navState == "review" && <Review />}
      </div>
    </>
  );
};

export default MoreDetails;

export const MoreInfo = () => {
  return (
    <div className={css.moreinfo}>
      <div className="mb-3">
        {`"Years ago, I bought the most stunning rattan daybed from the flea
        market in Paris," Suzanne recalls. "It became the muse for my Southport
        Collection." Her Southport Bed is meticulously hand woven of natural
        rattan with airy "X" details.`}
      </div>
      <div>Suzanne Kasler Southport Rattan Bed features:</div>
      <ul className="list-disc px-8 py-2">
        <li>Wrapped rattan peel edges</li>
        <li>Tightly woven panels</li>
        <li>Mahogany wood frame</li>
        <li>Assembly required</li>
      </ul>
    </div>
  );
};

export const DataSheet = () => {
  return (
    <div>
      <table className="w-full ">
        <tbody className="text-left text-gray-600 text-sm">
          <tr>
            <th className="py-4 px-4 border">Compositions</th>
            <td className="py-4 px-4 border">Cotton</td>
          </tr>
          <tr>
            <th className="py-4 px-4 border">Styles</th>
            <td className="py-4 px-4 border">Casual</td>
          </tr>
          <tr>
            <th className="py-4 px-4 border">Properties</th>
            <td className="py-4 px-4 border">Short Sleeve</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export const Review = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);

  const getReviews = useCallback(async () => {
    try {
      const { pid } = router.query;
      const res = await axios.get("/getreviews/" + pid);
      if (res.status == 200) {
        setReviews(res.data);
        return setLoading(false);
      }
    } catch (error) {
      console.error(error);
      return setLoading(false);
    }
  }, [router.query]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <div>
      {loading ? <Loading /> : null}
      {!loading && reviews.length == 0 ? (
        <div className="text-sm px-2 py-3 text-gray-700">0 reviews founds</div>
      ) : null}
      {reviews?.map((val, indx) => (
        <div key={indx} className={css.reviews}>
          <div>
            <div className=" md:text-lg lg:text-2xl">
              <ProductRating maxRating={parseInt(val?.rating || 2)} />
            </div>
            <h2 className="italic">By {val?.fullname}</h2>
            <article className="py-4 text-md italic">{val?.text || ""}</article>
          </div>
          <div>{moment.utc(new Date(val?.date)).fromNow()}</div>
        </div>
      ))}
    </div>
  );
};
