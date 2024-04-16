import React from "react";
import { Helmet } from "react-helmet";
import Feed from "./feed/Feed";
import Users from "./chat/Users";
import "../assets/style.css";

const App = () => (
  <div className="container">
    <Helmet>
      <title>Graphbook - Feed</title>
      <meta
        name="description"
        content="News feed of all your friends on Graphbook"
      />
    </Helmet>
    <Feed />
    <Users />
  </div>
);

export default App;
