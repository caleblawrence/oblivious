import useSWR from "swr";
import { Tweet } from "../Types/Tweet";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Home() {
  const { data, error } = useSWR("/api/my-timeline", fetcher);

  if (!data) return <div>Loading...</div>;

  if (!data.peopleIAmFollowing && !data.latestTweets) {
    return <div>There was an error.</div>;
  }

  return (
    <div className="container">
      <h1 className="logo">Oblivious</h1>
      <p className="tagLine">
        Follow a few cool people without actually being on Twitter.
      </p>
      <br />
      <p className="followerCount">
        You are following {data.peopleIAmFollowing.length} people.
      </p>

      {data.latestTweets.map((tweet: Tweet) => {
        return (
          <div>
            <p className="userName">{tweet.user.name}</p>
            <p className="tweetText">{tweet.text}</p>
          </div>
        );
      })}

      <style jsx>{`
        .container {
          margin-right: auto; /* 1 */
          margin-left: auto; /* 1 */

          max-width: 960px; /* 2 */

          padding-right: 10px; /* 3 */
          padding-left: 10px; /* 3 */
        }

        .logo {
          font-size: 50px;
          margin-bottom: 5px;
        }

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

        .tagLine {
          margin-top: 0;
          color: #656464;
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
      `}</style>
    </div>
  );
}

export default Home;
