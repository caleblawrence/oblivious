import SingleTweet from "./SingleTweet";

function TweetFeed({ tweets }) {
  return (
    <div>
      {tweets.map((tweet) => (
        <SingleTweet tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
}

export default TweetFeed;
