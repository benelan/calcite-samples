import React, { useState } from "react";
import {
  CalciteButton,
  CalciteDatePicker,
  CalciteIcon,
  CalciteSlider,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath("https://unpkg.com/@esri/calcite-components/dist/calcite/assets");


function Calcite() {
  const [sliderValue, setSliderValue] = useState(50);
  return (
    <>
      <h1 className="font-bold text-3xl">
        Calcite Components React in Next.js
        <CalciteIcon icon="banana" suppressHydrationWarning={true} />
      </h1>

      <CalciteDatePicker suppressHydrationWarning={true} />

      <p>
        This sample demonstrates using Calcite Components React (wrapper for web
        components) in Next.js (SSR/SSG). The components need to be imported
        dynamically in useEffect because they rely on browser APIs. The
        components are prerendered to help mitigate the FOUC. Resources:
      </p>
      <ol>
        <li>
          <a href="https://stenciljs.com/docs/v2/hydrate-app">
            Stencil hydrate app
          </a>
        </li>
        <li>
          <a href="https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props">
            Next.js getStaticProps
          </a>
        </li>
        <li>
          <a href="https://goulet.dev/posts/consuming-web-component-react-typescript/">
            TypeScript hack for using web components in React
          </a>
        </li>
        <li>
          <a href="https://github.com/jagreehal/nextjs-stenciljs-ssr-example">
            Example of Stencil components in Next.js
          </a>
        </li>
      </ol>

      <CalciteSlider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        onCalciteSliderInput={({ target: { value } }) =>
          typeof value === "number" && setSliderValue(value)
        }
      />
      <CalciteButton onClick={() => setSliderValue(0)}>Clear</CalciteButton>
    </>
  );
}

export default Calcite;
