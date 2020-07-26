import Head from "next/head";
import TweetFeed from "../components/TweetFeed";
import { GetServerSideProps } from "next";
import { Tweet } from "../types/Tweet";
import {
  getMyTimeline,
  getTwitterHandlesFromRequest,
} from "../twitter/MyTimeline";

interface Props {
  handles: string[];
  tweets: Tweet[];
}

function Home(props: Props) {
  const { handles, tweets } = props;

  return (
    <div className="container">
      <Head>
        <title>Oblivious</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {handles && (
        <p className="followerCount">
          You are viewing tweets from {handles.length} people.
        </p>
      )}

      {tweets ? <TweetFeed tweets={tweets} /> : <p>No data</p>}

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  let handles = getTwitterHandlesFromRequest(context);
  let data = await getMyTimeline(handles);

  return {
    props: {
      handles: data?.handles || [],
      tweets: data?.tweets || [],
    },
  };
};

export default Home;