import { renderToString } from "@esri/calcite-components/hydrate";
import type { JSXElementConstructor, ReactElement } from "react";
import ReactDOMServer from "react-dom/server";

export async function prerender(
  element: ReactElement<any, string | JSXElementConstructor<any>>
) {
  const html = ReactDOMServer.renderToString(element);
  let prerenderData: any;

  const stencilHydrateOutput = await renderToString(html, {
    removeHtmlComments: true,
    beforeHydrate: (doc) => {
      doc.__STENCIL_DATA__ = {};
    },
    afterHydrate: (doc) => {
      prerenderData = doc.__STENCIL_DATA__;
    },
  });

  return { prerenderHTML: stencilHydrateOutput.html, prerenderData };
}
