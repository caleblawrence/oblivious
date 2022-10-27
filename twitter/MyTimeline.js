export const getTwitterHandlesFromRequest = (context) => {
  let handles = [];
  if (context?.query?.handles) {
    if (Array.isArray(context.query.handles)) {
      handles = context.query.handles;
    } else if (isString(context.query.handles)) {
      handles.push(context.query.handles);
    }
  }
  return handles;
};

function isString(value) {
  return typeof value === "string";
}

export const getMyTimeline = async (handles) => {
  let tweets = await getLatestTweets(handles);

  return {
    handles: handles,
    tweets: tweets,
  };
};

const getLatestTweets = async (handles) => {
  let tweetsToReturn = [];

  await Promise.all(
    handles.map(async (handle) => {
      let userResponse = await fetch(
        `${process.env.TWITTER_API_URL}/users/by/username/${handle}?user.fields=profile_image_url`,
        {
          headers: new Headers({
            Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
          }),
        }
      );

      let user = await userResponse.json();

      let timelineResponse = await fetch(
        `${process.env.TWITTER_API_URL}/users/${user.data.id}/tweets?max_results=100&tweet.fields=referenced_tweets,created_at,attachments&media.fields=variants,alt_text,preview_image_url,url&expansions=attachments.media_keys`,
        {
          headers: new Headers({
            Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
          }),
        }
      );

      let { data: timeline, includes } = await timelineResponse.json();
      const media = includes.media;

      if (timeline.errors && timeline.errors.length) {
        console.error(
          "Error getting timeline from Twitter",
          timeline.errors[0]
        );
      }
      if (!Array.isArray(timeline)) {
        return [];
      }

      // we don't want to includes replies in this app there doesn't seem to be a way
      // to ask the twitter api for non reply tweets so we filter out the reply tweets
      for (const tweet of timeline) {
        if (
          tweet.referenced_tweets &&
          tweet.referenced_tweets[0].type === "replied_to"
        )
          continue;

        tweet.profile_image_url = user.data.profile_image_url;
        tweet.username = user.data.name;
        if (
          tweet.attachments &&
          tweet.attachments.media_keys &&
          tweet.attachments.media_keys.length
        ) {
          const mediaForTweet = media.find(
            (x) => x.media_key === tweet.attachments.media_keys[0]
          );
          if (mediaForTweet.type === "photo") {
            tweet.mediaUrl = mediaForTweet.url;
          }
        }
        tweetsToReturn.push(tweet);
      }
    })
  );
  return sortByDate(tweetsToReturn);
};

const sortByDate = (tweets) => {
  let sortedTweets = [...tweets];
  sortedTweets.sort(function (a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return sortedTweets;
};
