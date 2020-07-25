import { Tweet } from "../Types/Tweet";

interface Props {
  tweet: Tweet;
}
function SingleTweet(props: Props) {
  const { tweet } = props;
  return (
    <div>
      <div key={tweet.id}>
        <p className="userName">{tweet.user.name}</p>
        <p className="tweetText">{tweet.text}</p>
        {tweet.entities.media && (
          <img
            style={{ maxHeight: 400, marginBottom: 100 }}
            src={tweet.entities.media[0].media_url}
          />
        )}
      </div>
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

export default SingleTweet;
