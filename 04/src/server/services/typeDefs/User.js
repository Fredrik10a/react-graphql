import { gql } from 'apollo-server-express';

const user = gql`
    type User {
        id: ID
        avatar: String
        username: String
    }
`;

export default user;
