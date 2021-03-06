/* eslint-disable react/jsx-props-no-spreading */
import "../styles/index.css";
import "../styles/inputBox.scss";

interface Props {
  Component: any;
  pageProps: any;
}
export default function MyApp(props: Props) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}
