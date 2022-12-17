import DefaultImage from "components/DefaultImage";
import React from "react";
import css from "./css/CommunityPostCard.module.css";

const CommunityPostCard = ({ data }) => {
  return (
    <div
      className={"relative shadow-lg overflow-hidden rounded-lg " + css.card}
    >
      <DefaultImage
        src={data?.host + data?.imageSrc[0].url}
        alt="default-images"
        className={""}
      />
      {/* <div className={css.title}>{data.title}</div> */}
      {data?.type == "onsale" && data?.status == "onsale" ? (
        <>
          <div className={css.statusBanner}>sale</div>

          {/* <div className={css.price}>
            Rs. <span>1000</span>
          </div> */}
        </>
      ) : null}
      <div className={css.auther} title={"Avishek"}>
        Published by {data.seller__name}
      </div>
    </div>
  );
};

export default CommunityPostCard;
