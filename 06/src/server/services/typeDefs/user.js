import { gql } from 'apollo-server-express';

const user = gql`
    type User {
        id: ID
        avatar: String
        username: String
    }

    type UserSearch {
        users: [User]
    }

    extend type Query {
        users: [User]
        userSearch(page: Int, limit: Int, text: String): UserSearch
    }
`;

export default user;
