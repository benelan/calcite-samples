const Calcite = () => {
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
        <li>
          <a href="https://github.com/jagreehal/nextjs-stenciljs-ssr-example">
            Example of Stencil components in Next.js
          </a>
        </li>
      </ol>

      <calcite-slider
        min={1}
        max={100}
        value={50}
        step={1}
        suppressHydrationWarning={true}
      />
      <calcite-date-picker></calcite-date-picker>
    </>
  );
};

export default Calcite;
