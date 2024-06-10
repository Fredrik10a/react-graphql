import React, { useState } from 'react';
import UserSearchQuery from './userSearchQuery';
import SearchList from './searchList';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
            <UserSearchQuery text={searchTerm}>
                {({ users, loading, error }) => <SearchList users={users} loading={loading} error={error} />}
            </UserSearchQuery>
        </div>
    );
};

export default SearchBar;
