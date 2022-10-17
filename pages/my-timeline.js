import Head from "next/head";
import TweetFeed from "../components/TweetFeed";
import {
  getMyTimeline,
  getTwitterHandlesFromRequest,
} from "../twitter/MyTimeline";
import Header from "../components/Header";
import { useState } from "react";

function Home({ handles, tweets }) {
  const [isAddingHandles, setIsAddingHandles] = useState(false);
  const [input, setInput] = useState < string > "";
  const [handlesState, setHandlesState] = useState([...handles]);

  const addHandle = (e) => {
    if (input.trim() === "") return;
    let newInput = input;
    newInput = newInput.replace("@", "");

    setHandlesState([...handlesState, newInput]);
    setInput("");
  };

  const handleClick = () => {
    setIsAddingHandles(true);
  };

  const showMyFeed = () => {
    let env = process.env.NODE_ENV || "development";
    let url = "https://oblivious.vercel.app/my-timeline";
    if (env === "development") {
      url = "http://localhost:3000/my-timeline";
    }

    handlesState.forEach((handle, index) => {
      if (index === 0) {
        url += "?handles=" + handle;
      } else {
        url += "&handles=" + handle;
      }
    });

    window.location.href = url;
  };

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
          <>
            <p style={{ fontSize: 16, marginBottom: 0 }}>
              {" "}
              You are viewing tweets from:{" "}
              {handlesState.map((handle) => (
                <span key={handle} style={{ color: "#275EFE" }}>
                  {"@" + handle + " "}
                </span>
              ))}
            </p>
            {!isAddingHandles && (
              <button
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  padding: 2,
                  border: "1px solid #99A3BA",
                  borderRadius: 5,
                }}
                onClick={handleClick}
              >
                Add people
              </button>
            )}

            {isAddingHandles && (
              <div>
                <div className="form-group">
                  <span>@</span>
                  <input
                    className="form-field"
                    type="text"
                    placeholder="handle"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        addHandle(event);
                      }
                    }}
                  ></input>
                </div>
                <button
                  style={{
                    marginTop: 5,
                    padding: 3,
                    border: "1px solid #99A3BA",
                    borderRadius: 5,
                  }}
                  onClick={addHandle}
                >
                  Add ↵
                </button>
              </div>
            )}
            {isAddingHandles && (
              <div>
                <button
                  style={{
                    marginTop: 20,
                    padding: 8,
                    border: "1px solid #99A3BA",
                    borderRadius: 5,
                    fontSize: 18,
                    marginBottom: 10,
                  }}
                  onClick={showMyFeed}
                >
                  Refresh My Feed
                </button>
              </div>
            )}
          </>
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

export const getServerSideProps = async (context) => {
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
