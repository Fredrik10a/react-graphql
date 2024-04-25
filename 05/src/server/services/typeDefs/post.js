import { gql } from 'apollo-server-express';

const post = gql`
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

export default post;
