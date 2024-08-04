import { gql } from 'apollo-server-express';

const user = gql`
    type User {
        id: ID
        avatar: String
        username: String!
        email: String!
    }

    type UserSearch {
        users: [User]
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    extend type Query {
        users: [User] @auth
        userSearch(page: Int, limit: Int, text: String): UserSearch
        myUser: User
    }

    extend type Mutation {
        register(username: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }
`;

export default user;
