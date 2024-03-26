const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID
        avatar: String
        username: String
    }
`;

module.exports = userTypeDefs;
