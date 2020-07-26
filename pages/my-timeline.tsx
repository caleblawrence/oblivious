import Head from "next/head";
import TweetFeed from "../components/TweetFeed";
import { GetServerSideProps } from "next";
import { Tweet } from "../types/Tweet";
import {
  getMyTimeline,
  getTwitterHandlesFromRequest,
} from "../twitter/MyTimeline";
import Header from "../components/Header";

interface Props {
  handles: string[];
  tweets: Tweet[];
}

function Home(props: Props) {
  const { handles, tweets } = props;

  return (
    <>
      <Header />
      <div className="container">
        <Head>
          <title>Oblivious</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
      </div>
    </>
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
