const { gql } = require('apollo-server-express');

const chatTypeDefs = gql`
    type Message {
        id: ID
        text: String
        chat: Chat
        user: User
    }

    type Chat {
        id: ID
        messages: [Message]
        users: [User]
        lastMessage: Message
    }

    input ChatInput {
        users: [Int]
    }

    input MessageInput {
        text: String!
        chatId: Int!
    }

    extend type Mutation {
        addChat(chat: ChatInput!): Chat
    }

    extend type Query {
        chats: [Chat]
        chat(chatId: Int): Chat
    }
`;

module.exports = chatTypeDefs;
