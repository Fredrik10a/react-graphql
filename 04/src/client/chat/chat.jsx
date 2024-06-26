import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_MESSAGE, GET_CHAT, GET_CHATS } from './queries';
import { ADD_CHAT, GET_USERS } from './queries.js';

const Chats = () => {
    const [addChat] = useMutation(ADD_CHAT);
    const [openChats, setOpenChats] = useState([]);

    // Function to handle opening a chat
    const openChat = (id) => {
        let updatedOpenChats = [...openChats];
        if (!updatedOpenChats.includes(id)) {
            if (updatedOpenChats.length > 2) {
                updatedOpenChats.shift(); // Remove the oldest chat if more than 2 are open
            }
            updatedOpenChats.push(id);
        }
        setOpenChats(updatedOpenChats);
    };

    // Close chat window
    const closeChatWindow = (id) => {
        const updatedOpenChats = openChats.filter((chatId) => chatId !== id);
        setOpenChats(updatedOpenChats);
    };

    // Fetching the list of chats
    const { loading: chatsLoading, error: chatsError, data: chatsData, refetch: refetchChats } = useQuery(GET_CHATS);
    if (chatsLoading) return <p>Loading...</p>;
    if (chatsError) return <p>Error: {chatsError.message}</p>;
    if (!chatsData.chats) return <p>No chats...</p>;

    // ChatWindow component for each open chat
    const ChatWindow = ({ chatId }) => {
        const [textInputs, setTextInputs] = useState({});
        const { data, loading, error } = useQuery(GET_CHAT, {
            variables: { id: chatId },
        });

        // Function to handle text input changes
        const onChangeChatInput = (event, id) => {
            setTextInputs({ ...textInputs, [id]: event.target.value });
        };

        // Function to handle sending a message
        const handleKeyPress = async (event, userId, chatId, addMessage) => {
            if (event.key === 'Enter' && textInputs[chatId].trim() !== '') {
                await addMessage({
                    variables: {
                        message: {
                            text: textInputs[chatId],
                            chat: chatId,
                            user: userId,
                        },
                    },
                });
                setTextInputs({ ...textInputs, [chatId]: '' }); // Clear input after sending
            }
        };

        const [addMessage] = useMutation(ADD_MESSAGE, {
            update(cache, { data: { addMessage } }) {
                const chatId = addMessage.chat.id;
                const existingChat = cache.readQuery({
                    query: GET_CHAT,
                    variables: { id: chatId },
                });

                if (existingChat && existingChat.chat) {
                    const updatedChat = {
                        ...existingChat.chat,
                        messages: [...existingChat.chat.messages, addMessage],
                    };
                    cache.writeQuery({
                        query: GET_CHAT,
                        variables: { id: chatId },
                        data: { chat: updatedChat },
                    });
                }
            },
        });

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error! {error.message}</p>;

        return (
            <div className="chatWindow">
                <div className="header">
                    {data.chat.users.map((u) => u.username).join(', ')}
                    <button onClick={() => closeChatWindow(chatId)}>X</button>
                </div>
                <div className="messages">
                    {data.chat.messages.map((message) => (
                        <div key={message.id} className="message">
                            {message.text}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={textInputs[chatId] || ''}
                    onChange={(e) => onChangeChatInput(e, chatId)}
                    onKeyPress={(e) => handleKeyPress(e, '65f21051f15bdcc363a49e40', chatId, addMessage)}
                />
            </div>
        );
    };

    const initNewChat = async (userId) => {
        try {
            const response = await addChat({
                variables: {
                    chat: {
                        users: ['65f21051f15bdcc363a49e40', userId],
                    },
                },
            });
            const chat = response.data.addChat;
            openChat(chat.id);
            await refetchChats();
        } catch (error) {
            console.error('Error opening chat:', error);
        }
    };

    const Users = () => {
        const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_USERS);
        if (usersLoading) return <p>Loading...</p>;
        if (usersError) return <p>Error: {usersError.message}</p>;
        if (!usersData.users) return <p>No users...</p>;

        return (
            <div className="wrapper">
                <div className="users">
                    {usersData.users.map((user) => (
                        <div
                            key={user.id}
                            role="button"
                            onClick={() => initNewChat(user.id)}
                            onKeyDown={(e) => e.key === 'Enter' && initNewChat(user)}
                            tabIndex="0" // Make the div focusable
                            style={{ cursor: 'pointer' }}
                        >
                            <span>{user.username}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="wrapper">
            <Users />,
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
                                alt={`${chat.users[1]}"s avatar`}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>{chat.users[1].username}</div>
                                <div style={{ fontSize: '0.8em', opacity: 0.7 }}>{chat.messages[0]?.text}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="openChats">
                {openChats.map((chatId) => (
                    <ChatWindow key={chatId} chatId={chatId} />
                ))}
            </div>
        </div>
    );
};

export default Chats;
