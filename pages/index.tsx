import useSWR from "swr";
import { Tweet } from "../Types/Tweet";
import Head from "next/head";
import TweetFeed from "../components/TweetFeed";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Home() {
  let { data, error, isValidating } = useSWR("/api/my-timeline", fetcher);

  return (
    <div className="container">
      <Head>
        <title>Oblivious</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {data && data.peopleIAmFollowing && (
        <p className="followerCount">
          You are following {data.peopleIAmFollowing.length} people.
        </p>
      )}

      {isValidating && <p>Loading...</p>}

      {data && data.latestTweets ? (
        <TweetFeed tweets={data.latestTweets} />
      ) : (
        <p>No data</p>
      )}

      <style jsx>{`
        .followerCount {
          margin-top: 0;
        }
      `}</style>

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
