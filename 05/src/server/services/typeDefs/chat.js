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
        lastmessage: String
        users: [User]
    }

    input ChatInput {
        users: [ID]
        messages: [ID]
    }

    input MessageInput {
        text: String!
        chat: ID!
        user: ID!
    }

    extend type Mutation {
        addChat(chat: ChatInput!): Chat
        addMessage(message: MessageInput!): Message
    }

    extend type Query {
        chats: [Chat]
        chat(id: ID): Chat
    }
`;

export default chat;
