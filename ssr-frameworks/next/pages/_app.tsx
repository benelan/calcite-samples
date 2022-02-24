import React from "react";
import App from "next/app";
import Head from "next/head";
import "../utils/register-web-component.ts";
import "../styles/globals.css";
// import "../styles/tailwind.css";

export default class MyApp extends App {
  componentDidMount() {
    const {
      defineCustomElements,
    } = require("@esri/calcite-components/dist/loader");
    defineCustomElements(window, {
      resourceUrl: location.href,
    });
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/img/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/img/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
