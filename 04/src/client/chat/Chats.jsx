import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ADD_MESSAGE, GET_CHAT, GET_CHATS } from './Queries';

const Chats = () => {
    const [openChats, setOpenChats] = useState([]);
    const [textInputs, setTextInputs] = useState({});

    // Function to handle opening a chat
    const openChat = (id) => {
        let updatedOpenChats = [...openChats];
        if (!updatedOpenChats.includes(id)) {
            if (updatedOpenChats.length > 2) {
                updatedOpenChats.shift(); // Remove the oldest chat if more than 2 are open
            }
            updatedOpenChats.push(id);
            setTextInputs({ ...textInputs, [id]: '' }); // Prepare text input for new chat
        }
        setOpenChats(updatedOpenChats);
    };

    // Function to handle text input changes
    const onChangeChatInput = (event, id) => {
        setTextInputs({ ...textInputs, [id]: event.target.value });
    };

    // Function to handle sending a message
    const handleKeyPress = async (event, id, addMessage) => {
        if (event.key === 'Enter' && textInputs[id].trim() !== '') {
            await addMessage({
                variables: {
                    message: {
                        chatId: id,
                        text: textInputs[id],
                    },
                },
            });
            setTextInputs({ ...textInputs, [id]: '' }); // Clear input after sending
        }
    };

    // Fetching the list of chats
    const { loading: chatsLoading, error: chatsError, data: chatsData } = useQuery(GET_CHATS);
    if (chatsLoading) return <p>Loading...</p>;
    if (chatsError) return <p>Error: {chatsError.message}</p>;
    if (!chatsData.chats) return <p>No chats...</p>;

    // ChatWindow component for each open chat
    const ChatWindow = ({ chatId }) => {
        const { data, loading, error } = useQuery(GET_CHAT, { variables: { chatId } });
        const [addMessage] = useMutation(ADD_MESSAGE);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error! {error.message}</p>;

        return (
            <div className="chatWindow">
                <div className="header">{data.chat.users.map((u) => u.username).join(', ')}</div>
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
                    onKeyPress={(e) => handleKeyPress(e, chatId, addMessage)}
                />
            </div>
        );
    };

    return (
        <div className="wrapper">
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
                        {/* Render each chat summary here */}
                        Chat: {chat.lastMessage.text}
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
