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
        {tweet.entities?.media && (
          <img src={tweet.entities.media[0].media_url_https} />
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

        img {
          max-width: 800px;
          margin-bottom: 50px;
        }

        @media only screen and (max-width: 768px) {
          img {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default SingleTweet;
