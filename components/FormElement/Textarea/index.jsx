import React from "react";
import Label from "../Label";

const Textarea = ({
  title,
  row,
  name,
  classNameLabel,
  classnameInput,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div>
      <Label title={title} classNameLabel={classNameLabel} />

      <textarea
        id={title?.toLowerCase().replace(" ", "-")}
        rows={row || "4"}
        name={name}
        className={
          classnameInput ||
          "block p-2.5 outline-none w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
        }
        placeholder={placeholder || "Leave a message..."}
        onChange={onChange}
        value={value}
      ></textarea>
    </div>
  );
};

export default Textarea;
