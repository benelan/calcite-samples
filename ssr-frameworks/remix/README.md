# Calcite Components in Remix

**This is experimental and a lot of stuff is not working. Use at your own risk!**

Remix does not support pre-rendering at this time, but they have [an open issue discussing it](https://github.com/remix-run/remix/issues/179). Go give it a thumbs up!

I was able to get the components to render on the client, but that defeats the purpose of an SSR framework. The better option is to use NextJS or another framework that supports pre-rendering until Remix does too.

### Relevant code

In [`remix.config.js`](https://github.com/benelan/stencil-remix/blob/fix/remix.config.js):

```js
module.exports = {
...
  serverDependenciesToBundle: [
    "@esri/calcite-components",
    "@esri/calcite-components-react",
  ],
};
```
In [`app/routes/index.jsx`](https://github.com/benelan/stencil-remix/blob/fix/app/routes/index.jsx):

```jsx
import { useEffect } from "react";
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
    ...
```

---


- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
