import App from "next/app";
import Head from "next/head";

import "../styles.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>10万円支給されるやつ</title>
        </Head>
        <Component {...pageProps} />{" "}
      </>
    );
  }
}
