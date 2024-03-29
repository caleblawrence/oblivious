import { format } from "date-fns";

function SingleTweet({ tweet }) {
  return (
    <div className="tweet">
      <img className="profilePicture" src={tweet.profile_image_url} alt="" />
      <div className="tweetBody" key={tweet.id}>
        <p className="userName">{tweet.username}</p>
        <p className="date">
          <span className="spacer">·</span>
          {format(new Date(tweet.created_at), "MMM d")}
        </p>
        <p className="tweetText">{tweet.text}</p>
        {tweet.mediaUrl && <img src={tweet.mediaUrl} />}
      </div>
      <style jsx>{`
        .profilePicture {
          margin-top: 20px;
          margin-right: 5px;
          max-width: 50px;
        }
        .tweet {
          border-top: 1px solid #a5a5a5;
          display: flex;
          align-items: flex-start;
        }
        .userName {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 0;
          display: inline-block;
        }
        .spacer {
          margin: 5px;
          font-size: 22px;
          margin-bottom: 0;
        }
        .date {
          display: inline-block;
          color: #827b7b;
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
