const { gql } = require('apollo-server-express');

const postTypeDefs = gql`
    type Post {
        id: ID
        text: String
        user: User
    }

    type PostFeed {
        posts: [Post]
    }

    input PostInput {
        text: String!
    }

    extend type Query {
        Posts: [Post]
        postsFeed(page: Int, limit: Int): PostFeed
    }

    extend type Mutation {
        addPost(post: PostInput!): Post
    }
`;

module.exports = postTypeDefs;
