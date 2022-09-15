import React, { useState } from "react";
import css from "./moredetails.module.css";

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
      {`Fashion has been creating well-designed collections since 2010. The brand
      offers feminine designs delivering stylish separates and statement dresses
      which have since evolved into a full ready-to-wear collection in which
      every item is a vital part of a woman's wardrobe. The result? Cool, easy,
      chic looks with youthful elegance and unmistakable signature style. All
      the beautiful pieces are made in Italy and manufactured with the greatest
      attention. Now Fashion extends to a range of accessories including shoes,
      hats, belts and more!`}
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
  return (
    <div>
      <button className={css.reviewBtn}>Be the first to write your review!</button>
    </div>
  );
};
