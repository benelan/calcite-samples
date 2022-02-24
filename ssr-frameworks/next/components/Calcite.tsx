import React, { useState, useEffect, useRef } from "react";
import "@esri/calcite-components/dist/calcite/calcite.css";

function Calcite() {
  const [sliderValue, setSliderValue] = useState(50);
  const sliderEl = useRef(null);
  const buttonEl = useRef(null);

  useEffect(() => {
    sliderEl.current.addEventListener(
      "calciteSliderUpdate",
      ({ target: { value } }) => setSliderValue(value)
    );
    buttonEl.current.addEventListener("click", () => setSliderValue(0));
  }, [sliderEl, buttonEl]);

  return (
    <>
      <h1 className="font-bold text-lg">
        NextJS and Calcite
        <calcite-icon icon="banana" suppressHydrationWarning={true} />
      </h1>
      <p>
        This is my attempt to prerender calcite-components
      </p>
      <calcite-slider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        ref={sliderEl}
        suppressHydrationWarning={true}
      />
      <p>The slider currently has a value of {sliderValue}.</p>
      <calcite-button ref={buttonEl} suppressHydrationWarning={true}>
        Clear
      </calcite-button>
      <div className="flex justify-center">
        <calcite-date-picker />
      </div>
    </>
  );
}

export default Calcite;
