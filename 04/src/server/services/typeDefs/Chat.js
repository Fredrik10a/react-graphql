import { gql } from 'apollo-server-express';
import './user.js';

const chat = gql`
    type Message {
        id: ID
        text: String
        chat: Chat
        user: User
    }

    type Chat {
        id: ID!
        messages: [Message]
        users: [User]
        lastMessage: Message
    }

    input ChatInput {
        users: [ID]
        lastMessage: ID
        messages: [ID]
    }

    input MessageInput {
        text: String!
        chatId: ID!
    }

    extend type Mutation {
        addChat(chat: ChatInput!): Chat
    }

    extend type Query {
        chats: [Chat]
        chat(chatId: ID): Chat
    }
`;

export default chat;
