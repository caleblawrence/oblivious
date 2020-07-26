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

      <h3>
        This page is still being developed but you can view a feed by creating a
        url like:
      </h3>
      <a href="https://oblivious.vercel.app/my-timeline?handles=timneutkens&handles=dan_abramov">
        https://oblivious.vercel.app/my-timeline?handles=timneutkens&handles=dan_abramov
      </a>
    </div>
  );
}

export default Home;
