import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_USERS } from "./user/queries.js";
import { ADD_CHAT } from "./queries.js";

const Users = () => {
  const [addChat] = useMutation(ADD_CHAT);
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS);
  if (usersLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error: {usersError.message}</p>;
  if (!usersData.users) return <p>No users...</p>;

  const openChat = async (userId) => {
    try {
      await addChat({
        variables: {
          chat: {
            users: [userId, userId],
          },
        },
      });
    } catch (error) {
      console.error("Error opening chat:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="users">
        {usersData.users.map((user) => (
          <div
            key={user.id}
            role="button"
            onClick={() => openChat(user.id)}
            onKeyDown={(e) => e.key === "Enter" && openChat(user)}
            tabIndex="0" // Make the div focusable
            style={{ cursor: "pointer" }}
          >
            <span>{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
