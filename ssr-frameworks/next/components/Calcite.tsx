"use client";

import React, { useState, useEffect, useRef } from "react";
import "@esri/calcite-components/dist/calcite/calcite.css";

function Calcite() {
  const [sliderValue, setSliderValue] = useState(50);
  const sliderEl = useRef(null);

  useEffect(() => {
    async function registerComponents() {
      const { setAssetPath } = await import(
        "@esri/calcite-components/dist/components"
      );
      setAssetPath(window.location.href);

      await import("@esri/calcite-components/dist/components/calcite-date-picker");
      await import("@esri/calcite-components/dist/components/calcite-button");
      await import("@esri/calcite-components/dist/components/calcite-icon");
      await import("@esri/calcite-components/dist/components/calcite-slider");
    }
    registerComponents();

    sliderEl.current.addEventListener("calciteSliderInput", ({ target }) =>
      setSliderValue(target.value)
    );
  }, [sliderEl]);

  return (
    <>
      <h1 className="font-bold text-3xl">
        Next.js and Calcite Components
        <calcite-icon icon="banana" suppressHydrationWarning={true} />
      </h1>
      <p>This is my attempt to prerender calcite-components. Resources:</p>

      <ol>
        <li>
          <a href="https://stenciljs.com/docs/v2/hydrate-app">
            Stencil hydrate app
          </a>
        </li>
        <li>
          <a href="https://nextjs.org/docs/pages/building-your-application/configuring/custom-server">
            Next.js custom server
          </a>
        </li>
        <li>
          <a href="https://goulet.dev/posts/consuming-web-component-react-typescript/">
            TypeScript hack for using web components in React
          </a>
        </li>
      </ol>

      <calcite-slider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        ref={sliderEl}
        suppressHydrationWarning={true}
      />
      <p>The slider currently has a value of {sliderValue}.</p>
      <calcite-button
        onClick={() => setSliderValue(0)}
        suppressHydrationWarning={true}
      >
        Clear
      </calcite-button>
    </>
  );
}

export default Calcite;
