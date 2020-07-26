import Head from "next/head";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// TODO: input box for people they want to follow
function Home() {
  return (
    <div className="container">
      <Head>
        <title>Oblivious</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .container {
          margin-right: auto; /* 1 */
          margin-left: auto; /* 1 */

          max-width: 960px; /* 2 */

          padding-right: 10px; /* 3 */
          padding-left: 10px; /* 3 */
        }
      `}</style>
    </div>
  );
}

export default Home;
