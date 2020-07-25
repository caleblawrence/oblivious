import { Tweet } from "../Types/Tweet";

interface Props {
  tweets: Tweet[];
}
function TweetFeed(props: Props) {
  const { tweets } = props;
  return (
    <div>
      {tweets.map((tweet: Tweet) => {
        return (
          <div key={tweet.id}>
            <p className="userName">{tweet.user.name}</p>
            <p className="tweetText">{tweet.text}</p>
          </div>
        );
      })}
      <style jsx>{`
        .userName {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 0;
        }

        .tweetText {
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}

export default TweetFeed;
