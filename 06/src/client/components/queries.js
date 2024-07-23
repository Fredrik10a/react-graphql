import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
    query ($page: Int, $limit: Int, $text: String) {
        userSearch(page: $page, limit: $limit, text: $text) {
            users {
                id
                avatar
                username
            }
        }
    }
`;
