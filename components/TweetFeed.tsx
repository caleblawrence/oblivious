import { Tweet } from "../types/Tweet";
import SingleTweet from "./SingleTweet";

interface Props {
  tweets: Tweet[];
}
function TweetFeed(props: Props) {
  const { tweets } = props;
  return (
    <div>
      {tweets.map((tweet: Tweet) => (
        <SingleTweet tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
}

export default TweetFeed;
