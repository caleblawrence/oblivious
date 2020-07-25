import { NextApiRequest, NextApiResponse } from "next";
import { Person } from "../../Types/Person";
import { Tweet } from "../../Types/Tweet";
import * as exampleData from "../../example-my-timeline-response.json";
import { Console } from "console";

interface MyTimelineResponse {
  peopleIAmFollowing: Person[];
  latestTweets: Tweet[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let env = process.env.NODE_ENV || "development";
  let response = null;
  if (env === "development") {
    response = getMockData();
  } else {
    console.log("Calling twitter api...");
    let peopleIAmFollowing = await getPeopleIAmFollowing();
    let tweets = await getLatestTweets(peopleIAmFollowing);

    response = {
      peopleIAmFollowing: peopleIAmFollowing,
      latestTweets: tweets,
    };
  }

  res.status(200).json(response);
};

// TODO: get these from a db based on user token
const getPeopleIAmFollowing = async () => {
  let person1: Person = {
    name: "Dan",
    handle: "dan_abramov",
  };

  let person2: Person = {
    name: "Tim",
    handle: "timneutkens",
  };

  return [person1, person2];
};

const getLatestTweets = async (peopleIAmFollowing: Person[]) => {
  const twitterAPI = "https://api.twitter.com/1.1/statuses/user_timeline.json";

  let tweets: Tweet[] = [];

  await Promise.all(
    peopleIAmFollowing.map(async (person) => {
      let response = await fetch(
        `${twitterAPI}?screen_name=${person.handle}&exclude_replies=true&count=20&include_rts=true`,
        {
          headers: new Headers({
            Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
          }),
        }
      );

      let data = await response.json();

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

const getMockData = () => {
  let response: MyTimelineResponse = {
    peopleIAmFollowing: exampleData.peopleIAmFollowing,
    latestTweets: exampleData.latestTweets,
  };
  return response;
};
