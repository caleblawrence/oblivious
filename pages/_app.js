/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../styles/index.css";
import "../styles/inputBox.scss";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}
