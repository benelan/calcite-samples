import { useEffect, useState } from "react";
import {
  CalciteButton,
  CalciteIcon,
  CalciteSlider,
} from "@esri/calcite-components-react";
import styles from "@esri/calcite-components/dist/calcite/calcite.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Index() {
  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    import("@esri/calcite-components/dist/components").then(
      ({ setAssetPath }) =>
        setAssetPath(
          "https://unpkg.com/@esri/calcite-components/dist/calcite/assets"
        )
    );

    import("@esri/calcite-components/dist/components/calcite-button.js");
    import("@esri/calcite-components/dist/components/calcite-icon.js");
    import("@esri/calcite-components/dist/components/calcite-slider.js");
  }, []);

  return (
    <>
      <h1>
        Calcite Components in Remix.run <CalciteIcon icon="banana" scale="l" />
      </h1>
      <CalciteSlider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        onCalciteSliderUpdate={(e) => setSliderValue(e.target.value)}
      />
      <p>The slider currently has a value of {sliderValue}.</p>
      <CalciteButton onClick={() => setSliderValue(100)}>Set Max Value</CalciteButton>
    </>
  );
}

export default Index;
