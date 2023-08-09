/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@stencil/core",
    "@esri/calcite-components",
    "@esri/calcite-components-react",
  ],
};

module.exports = nextConfig;
