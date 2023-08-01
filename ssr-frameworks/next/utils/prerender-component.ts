import { renderToString } from "@esri/calcite-components/hydrate";
import type { JSXElementConstructor, ReactElement } from "react";
import ReactDOMServer from "react-dom/server";

export async function prerender(
  element: ReactElement<any, string | JSXElementConstructor<any>>
) {
  const html = ReactDOMServer.renderToString(element);
  const stencilHydrateOutput = await renderToString(html, {
    removeHtmlComments: true,
  });

  return { prerenderHTML: stencilHydrateOutput.html };
}
