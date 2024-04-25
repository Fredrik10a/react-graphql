import { gql } from 'apollo-server-express';

const user = gql`
    type User {
        id: ID
        avatar: String
        username: String
    }

    extend type Query {
        users: [User]
    }
`;

export default user;
