import React from 'react';
import Loading from '@client/components/loader';
import Error from '@client/components/error';

const SearchList = ({ users, loading, error }) => {
    if (loading) return <Loading />;
    if (error)
        return (
            <Error>
                <p>{error.message}</p>
            </Error>
        );
    if (users.length === 0) return null; // Return null if the users array is empty

    return (
        <div className="result">
            {users.map((user) => (
                <div key={user.id} className="user">
                    <img src={`${process.env.REACT_APP_BACKEND_URL}${user.avatar}`} alt={`${user.username}'s avatar`} />
                    <span>{user.username}</span>
                </div>
            ))}
        </div>
    );
};

export default SearchList;
