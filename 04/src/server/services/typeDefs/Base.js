const { gql } = require('apollo-server-express');

const baseTypeDefs = gql`
    type Query {
        _base: String
    }

    type Mutation {
        _base: String
    }
`;

module.exports = baseTypeDefs;
