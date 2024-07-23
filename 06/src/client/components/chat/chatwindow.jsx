import React, { useState } from 'react';
import { ADD_MESSAGE, GET_CHAT } from './queries';
import { useQuery, useMutation } from '@apollo/client';
import Loading from '@client/components/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatWindow = ({ chatId, closeChatWindow }) => {
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

    if (loading) return <Loading />;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <div className="chatWindow">
            <div className="header">
                {data.chat.users.map((u) => u.username).join(', ')}
                <button onClick={() => closeChatWindow(chatId)}>{<FontAwesomeIcon icon="fa-window-close" />}</button>
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

export default ChatWindow;
