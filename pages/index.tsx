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

      <h3>Legal</h3>
      <p>
        This website adheres to all the restructions under the "Public display
        of Tweets" section of the{" "}
        <a href="https://developer.twitter.com/en/developer-terms/agreement-and-policy">
          Twitter Developer Terms
        </a>
      </p>
      <p>
        The terms state: If you don’t use Twitter for Websites to display
        content, then you must use the Twitter API to retrieve the most current
        version available for display. If displayed content ceases to be
        available through the Twitter API, then you must remove it from your
        service as soon as reasonably possible, or within 24 hours after the
        receipt of a removal request from Twitter, or the applicable Twitter
        account owner, or as otherwise required by applicable law.
      </p>

      <strong>
        This website follows these rules. If you wish to interact with these
        tweets you should create an account on Twitter.
      </strong>
    </div>
  );
}

export default Home;
