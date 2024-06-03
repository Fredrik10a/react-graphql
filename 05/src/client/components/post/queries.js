import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query ($page: Int, $limit: Int) {
        postsFeed(page: $page, limit: $limit) {
            posts {
                id
                text
                user {
                    avatar
                    username
                }
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation ($post: PostInput!) {
        addPost(post: $post) {
            id
            text
            user {
                username
                avatar
            }
        }
    }
`;
