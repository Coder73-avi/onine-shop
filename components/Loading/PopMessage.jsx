import React from "react";
import css from "./css/popmessage.module.css";

const PopMessage = () => {
  return (
    <div className={css.pop_main}>
      <div className={css.pop_container}>
        <div className={css.pop_sign}></div>
        <h1 className={css.pop_message + " " + css.message}>
          Login Successfully
        </h1>
        <h1 className={css.pop_sub_message + " " + css.message}>
          You redirect to Myaccount Page
        </h1>
      </div>
    </div>
  );
};

export default PopMessage;
