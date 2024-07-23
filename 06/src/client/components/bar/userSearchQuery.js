import { useQuery } from '@apollo/client';
import { SEARCH_USERS } from '../queries.js';

const UserSearchQuery = ({ text, children }) => {
    const { loading, error, data } = useQuery(SEARCH_USERS, {
        variables: { page: 0, limit: 10, text },
        skip: !text || text.length < 3, // Skip the query if the search text is empty
    });

    const users = data ? data.userSearch.users : [];

    return children({ users, loading, error });
};

export default UserSearchQuery;
