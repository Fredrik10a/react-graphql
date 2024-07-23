import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ChatWindow from '@client/components/chat/chatwindow';
import Users from '@client/components/chat/users';
import Loading from '@client/components/loader';
import { GET_CHATS } from '@client/components/chat/queries';

const Chats = () => {
    const [openChats, setOpenChats] = useState([]);
    const [users, setUsers] = useState([]);

    const handleUsersLoaded = (loadedUsers) => {
        setUsers(loadedUsers);
    };

    // Fetching defined chats
    const {
        loading: chatsLoading,
        error: chatsError,
        data: chatsData,
        refetch: refetchChats,
    } = useQuery(GET_CHATS, {
        skip: users.length === 0, // Skip fetching chatsData until usersData is fully loaded
    });

    if (users.length === 0) return <Users onUsersLoaded={handleUsersLoaded} />;
    if (chatsLoading) return <Loading />;
    if (chatsError) return <p>Error: {chatsError.message}</p>;

    // Function to handle opening a chat
    const openChat = (id) => {
        let updatedOpenChats = [...openChats];
        if (!updatedOpenChats.includes(id)) {
            if (updatedOpenChats.length > 2) {
                updatedOpenChats.shift(); // Remove the oldest chat if more than 2 are open
                refetchChats();
            }
            updatedOpenChats.push(id);
        }
        setOpenChats(updatedOpenChats);
    };

    const closeChatWindow = (id) => {
        setOpenChats(openChats.filter((chatId) => chatId !== id));
    };

    return (
        <>
            <div className="chats">
                {chatsData.chats.map((chat) => (
                    // Use a button for interactive elements, or add role and tabIndex if it must be a div
                    <div
                        key={chat.id}
                        onClick={() => openChat(chat.id)}
                        onKeyDown={(e) => e.key === 'Enter' && openChat(chat.id)} // Example keyboard listener
                        role="button" // Indicate the role for assistive technologies
                        tabIndex="0" // Make the div focusable
                        style={{ cursor: 'pointer' }} // Visual cue for interactivity
                    >
                        <div className="header" style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                style={{ maxHeight: '50px' }}
                                src={`${process.env.REACT_APP_BACKEND_URL}${chat.users[1].avatar}`}
                                alt={`${chat.users[1].username}'s avatar`}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>{chat.users[1].username}</div>
                                <div style={{ fontSize: '0.8em', opacity: 0.7 }}>{chat.lastmessage}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="openChats">
                {openChats.map((chatId) => (
                    <ChatWindow key={chatId} chatId={chatId} closeChatWindow={closeChatWindow} />
                ))}
            </div>
        </>
    );
};

export default Chats;
