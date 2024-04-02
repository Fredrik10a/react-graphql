import { gql } from 'apollo-server-express';

const base = gql`
    type Query {
        _base: String
    }

    type Mutation {
        _base: String
    }
`;

export default base;
