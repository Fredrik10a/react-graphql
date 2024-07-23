import React, { useState, useEffect } from 'react';
import UserSearchQuery from './userSearchQuery';
import SearchList from './searchList';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = () => {
        if (searchTerm.length >= 0) {
            setSearchTerm(''); // Clear the search term if clicked outside
        }
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
