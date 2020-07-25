import useSWR from "swr";
import { Tweet } from "../Types/Tweet";
import Head from "next/head";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Home() {
  let { data, error } = useSWR("/api/my-timeline", fetcher);

  // TODO: this is code smell but I don't another way
  if (!data || !data.peopleIAmFollowing || !data.latestTweets) {
    data = {
      peopleIAmFollowing: [],
      latestTweets: [],
    };
  }

  return (
    <div className="container">
      <Head>
        <title>Oblivious</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <p className="followerCount">
        You are following {data.peopleIAmFollowing.length} people.
      </p>

      {!data && <p>Loading...</p>}

      {data.latestTweets.map((tweet: Tweet) => {
        return (
          <div key={tweet.id}>
            <p className="userName">{tweet.user.name}</p>
            <p className="tweetText">{tweet.text}</p>
          </div>
        );
      })}

      <style jsx>{`
        .followerCount {
          margin-top: 0;
        }

        .userName {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 0;
        }

        .tweetText {
          margin-top: 5px;
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
