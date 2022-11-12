import React from "react";
import css from "./style.module.css";
import { BsFillStarFill } from "react-icons/bs";

const ProductRating = ({ maxRating }) => {
  return (
    <div className={css.card__rating}>
      {Array(5)
        .fill()
        .map((val, indx) => (
          <BsFillStarFill
            key={indx}
            className={indx < maxRating ? css.active : null}
          />
        ))}
    </div>
  );
};

export default ProductRating;
