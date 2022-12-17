import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full  flex flex-row justify-center items-center z-50 bg-white">
      <div className={"sk-cube-grid"}>
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    </div>
  );
};

export default Loading;
