import React from "react";

const Label = ({ title, classNameLabel }) => {
  return (
    <label
      htmlFor={title?.toLowerCase()}
      className={
        classNameLabel || "block mb-2 text-sm  text-gray-700 dark:text-gray-300"
      }
    >
      {title}
    </label>
  );
};

export default Label;
