const stencil = require("@esri/calcite-components/hydrate");
const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // static assets
  server.get("/_next/*", handle);
  server.get("/assets/*", handle);

  server.all("*", async (req, res) => {
    const html = await app.renderToHTML(req, res, req.path, req.query);
    const renderedHtml = await stencil.renderToString(html);
    return res.send(renderedHtml.html);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
