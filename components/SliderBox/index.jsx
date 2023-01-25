import React, { useEffect, useRef, useState } from "react";
import css from "./style.module.css";

const SliderBox = () => {
  const sliderDiv = useRef();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    console.log(">1", sliderDiv.current.offsetWidth);
    sliderDiv.current.scrollTo(scrollY, 0);
  }, [scrollY]);

  const Prev = () => {
    const val = scrollY - 250;
    if (val < 0) return setScrollY(0);
    return setScrollY(val);
  };
  const Next = () => {
    const val = scrollY + 250;
    const noOfSlides = 10;
    const fullWidth = 300 * noOfSlides - noOfSlides * 10;
    if (fullWidth < val) return setScrollY(fullWidth);
    return setScrollY(val);
  };

  return (
    <div>
      <div>{scrollY}</div>
      <div className={css.arrowDiv}>
        <button onClick={Prev}>prev</button>
        <button onClick={Next}>next</button>
      </div>
      <div className={css.sliderDiv} ref={sliderDiv}>
        {Array(10)
          .fill()
          .map((val, indx) => {
            return (
              <div key={indx} className="p-4">
                <div className=" border flex flex-col justify-center items-center font-bold text-xl min-h-[300px] min-w-[300px]">
                  Slider {indx + 1}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SliderBox;
