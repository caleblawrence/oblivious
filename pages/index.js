import Head from "next/head";
import Header from "../components/Header";
import { useState } from "react";
import React from "react";

function Home() {
  const [handles, setHandles] = useState([]);
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    if (input.trim() === "") return;
    let newInput = input;
    newInput = newInput.replace("@", "");

    setHandles([...handles, newInput]);
    setInput("");
  };

  const showMyFeed = () => {
    let env = process.env.NODE_ENV || "development";
    let url = "https://oblivious.vercel.app/my-timeline";
    if (env === "development") {
      url = "http://localhost:3000/my-timeline";
    }

    handles.forEach((handle, index) => {
      if (index === 0) {
        url += "?handles=" + handle;
      } else {
        url += "&handles=" + handle;
      }
    });

    window.location.href = url;
  };

  return (
    <div className="container">
      <Head>
        <title>Oblivious</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />

      <h2>Enter the Twitter handles you want to follow:</h2>
      <p style={{ fontSize: 16, color: "#275EFE" }}>
        {handles.map((handle) => "@" + handle + " ")}
      </p>

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
              handleClick(event);
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
        onClick={handleClick}
      >
        Add ↵
      </button>

      <div>
        <button
          style={{
            marginTop: 20,
            padding: 8,
            border: "1px solid #99A3BA",
            borderRadius: 5,
            fontSize: 18,
          }}
          onClick={showMyFeed}
        >
          Show My Feed
        </button>
        <p>Be sure and bookmark your feed so you can view it again.</p>
      </div>

      <h2 style={{ marginTop: 100 }}>Legal</h2>
      <p>
        This website adheres to all the restructions under the "Public display
        of Tweets" section of the{" "}
        <a href="https://developer.twitter.com/en/developer-terms/agreement-and-policy">
          Twitter Developer Terms
        </a>
      </p>
      <p>
        The terms state: If you don’t use Twitter for Websites to display
        content, then you must use the Twitter API to retrieve the most current
        version available for display. If displayed content ceases to be
        available through the Twitter API, then you must remove it from your
        service as soon as reasonably possible, or within 24 hours after the
        receipt of a removal request from Twitter, or the applicable Twitter
        account owner, or as otherwise required by applicable law.
      </p>

      <strong>
        This website follows these rules. If you wish to interact with these
        tweets you should create an account on Twitter.
      </strong>
    </div>
  );
}

export default Home;
