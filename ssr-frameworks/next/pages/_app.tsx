import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import "../utils/register-web-component";
import "@esri/calcite-components/dist/calcite/calcite.css";
// import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function registerComponents() {
      const { setAssetPath } = await import(
        "@esri/calcite-components/dist/components"
      );
      setAssetPath(window.location.href);

      await import(
        "@esri/calcite-components/dist/components/calcite-date-picker"
      );
      await import("@esri/calcite-components/dist/components/calcite-button");
      await import("@esri/calcite-components/dist/components/calcite-icon");
      await import("@esri/calcite-components/dist/components/calcite-slider");
    }
    registerComponents();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
