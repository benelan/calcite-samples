import {
  CalciteButton,
  CalciteDatePicker,
  CalciteIcon,
  CalciteSlider,
} from "@esri/calcite-components-react";
import styles from "@esri/calcite-components/dist/calcite/calcite.css";
import { useEffect, useState } from "react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Index() {
  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    async function registerComponents() {
      const { setAssetPath } = await import(
        "@esri/calcite-components/dist/components"
      );
      setAssetPath(
        "https://unpkg.com/@esri/calcite-components/dist/calcite/assets"
      );

      await import("@esri/calcite-components/dist/components/calcite-button");
      await import("@esri/calcite-components/dist/components/calcite-icon");
      await import("@esri/calcite-components/dist/components/calcite-slider");
      await import(
        "@esri/calcite-components/dist/components/calcite-date-picker"
      );
    }
    registerComponents();
  }, []);

  return (
    <>
      <h1>
        Calcite Components in Remix.run <CalciteIcon icon="banana" />
      </h1>

      <CalciteDatePicker />

      <p>
        This sample demonstrates using Calcite Components (web components) in
        Remix (SSR). The components need to be imported dynamically in useEffect
        because they rely on browser APIs.
      </p>

      <CalciteSlider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        onCalciteSliderInput={(e) => setSliderValue(e.target.value)}
      />
      <p>The slider currently has a value of {sliderValue}</p>
      <CalciteButton onClick={() => setSliderValue(0)}>Clear</CalciteButton>
    </>
  );
}

export default Index;
