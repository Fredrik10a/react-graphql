import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";

import { GET_POSTS, ADD_POST } from "./Queries";

const Feed = () => {
  const [postContent, setPostContent] = useState("");

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { page: 0, limit: 10 },
  });

  const [addPost] = useMutation(ADD_POST, {
    update: (store, { data: { addPost } }) => {
      const variables = { page: 0, limit: 10 };
      const originalData = store.readQuery({ query: GET_POSTS, variables });
      const data = JSON.parse(JSON.stringify(originalData)); // Deep copy
      data.postsFeed.posts.unshift(addPost);
      store.writeQuery({ query: GET_POSTS, variables, data });
    },
    optimisticResponse: {
      __typename: "Mutation",
      addPost: {
        __typename: "Post",
        text: postContent,
        id: -1, // Temporary ID
        user: {
          __typename: "User",
          username: "Loading...",
          avatar: "/public/loading.gif",
        },
      },
    },
  });

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (postContent !== "") {
      await addPost({ variables: { post: { text: postContent } } });
    }
    setPostContent("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts = data?.postsFeed?.posts || [];

  return (
    <div className="container">
      <div className="postForm">
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={handlePostContentChange}
            placeholder="Write your custom post!"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="feed">
        <InfiniteScroll
          loader={
            <div className="loader" key="loader">
              Loading ...
            </div>
          }
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className={`post ${post.id < 0 ? "optimistic" : ""}`}
            >
              <div className="header">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${post.user.avatar}`}
                  alt={`${post.user.username}"s avatar`}
                />
                <h2>{post.user.username}</h2>
              </div>
              <p className="content">{post.text}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;
