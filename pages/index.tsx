import Head from "next/head";
import Header from "../components/Header";

// TODO: input box for people they want to follow
function Home() {
  return (
    <div className="container">
      <Head>
        <title>Oblivious</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
    </div>
  );
}

export default Home;
