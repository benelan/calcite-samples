/**
 * @see https://stenciljs.com/docs/v2/hydrate-app
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
 * @see https://github.com/jagreehal/nextjs-stenciljs-ssr-example
 */
const stencil = require("@esri/calcite-components/hydrate");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT, 10) || 3001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

/** Using Node's standard library */
const { createServer } = require("node:http");
const { parse } = require("node:url");
app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/__next") ||
        pathname.startsWith("/assets")
      ) {
        return await handle(req, res, parsedUrl);
      } else {
        const html = await app.renderToHTML(req, res, pathname, query);
        const renderedHtml = await stencil.renderToString(html);
        res.end(renderedHtml.html);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});


/** Using Express */
// const express = require("express");
// app.prepare().then(() => {
//   const server = express();

//   // handle static assets
//   server.get("/_next/*", handle);
//   server.get("/assets/*", handle);

//   // prerender pages
//   server.all("*", async (req, res) => {
//     const html = await app.renderToHTML(req, res, req.path, req.query);
//     const renderedHtml = await stencil.renderToString(html);
//     res.send(renderedHtml.html);
//   });

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });

