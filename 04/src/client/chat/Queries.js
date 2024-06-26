import { gql } from '@apollo/client';

export const GET_CHATS = gql`
    query chats {
        chats {
            id
            users {
                id
                avatar
                username
            }
            messages {
                id
                text
            }
        }
    }
`;

export const GET_CHAT = gql`
    query chat($id: ID!) {
        chat(id: $id) {
            id
            users {
                id
                username
            }
            messages {
                id
                text
            }
        }
    }
`;

export const ADD_MESSAGE = gql`
    mutation addMessage($message: MessageInput!) {
        addMessage(message: $message) {
            id
            text
            user {
                id
            }
            chat {
                id
            }
        }
    }
`;

export const ADD_CHAT = gql`
    mutation addChat($chat: ChatInput!) {
        addChat(chat: $chat) {
            id
            users {
                id
                username
            }
        }
    }
`;

export const GET_USERS = gql`
    query users {
        users {
            id
            avatar
            username
        }
    }
`;
