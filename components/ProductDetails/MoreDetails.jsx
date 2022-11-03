import React, { useState } from "react";
import css from "./css/moredetails.module.css";

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
  return (
    <div>
      <button className={css.reviewBtn}>
        Be the first to write your review!
      </button>
    </div>
  );
};
