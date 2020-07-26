import { Tweet } from "../types/Tweet";

export const getTwitterHandlesFromRequest = (context: any) => {
  let handles: string[] = [];
  if (context?.query?.handles) {
    if (Array.isArray(context.query.handles)) {
      handles = context.query.handles;
    } else if (isString(context.query.handles)) {
      handles.push(context.query.handles);
    }
  }
  return handles;
};

function isString(value: any) {
  return typeof value === "string" || value instanceof String;
}
export const getMyTimeline = async (handles: string[]) => {
  console.log("Calling twitter api...");
  let tweets = await getLatestTweets(handles);

  return {
    handles: handles,
    tweets: tweets,
  };
};

const getLatestTweets = async (handles: string[]) => {
  const twitterAPI = "https://api.twitter.com/1.1/statuses/user_timeline.json";

  let tweets: Tweet[] = [];

  await Promise.all(
    handles.map(async (handle) => {
      let response = await fetch(
        `${twitterAPI}?screen_name=${handle}&exclude_replies=true&count=100&include_rts=true`,
        {
          headers: new Headers({
            Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
          }),
        }
      );

      let data = await response.json();
      if (!Array.isArray(data)) {
        return [];
      }

      data.forEach((tweet: Tweet) => {
        tweets.push(tweet);
      });
    })
  );
  let tweetsSorted = sortByDate(tweets);
  return tweetsSorted;
};

const sortByDate = (tweets: Tweet[]) => {
  let sortedTweets = [...tweets];
  sortedTweets.sort(function (a: Tweet, b: Tweet) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return sortedTweets;
};
