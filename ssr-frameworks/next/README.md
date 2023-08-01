# Calcite Components in Next.js

**This is experimental, use at your own risk!**

The sample demonstrates using Calcite Components (web components) in Next.js (SSG/SSR). The following resources were used to create this sample:

- [Stencil hydrate app](https://stenciljs.com/docs/v2/hydrate-app)
- [Next.js custom server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)
- [TypeScript hack for using web components in React](https://goulet.dev/posts/consuming-web-component-react-typescript/)
- [Example of Stencil components in Next.js](https://github.com/jagreehal/nextjs-stenciljs-ssr-example)

The prerender magic happens in [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props). Unfortunately, this workflow makes state management difficult. You'll likely need a data store that can be accessed on both the client and server ([e.g. via Redux](https://redux.js.org/usage/server-rendering))

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
