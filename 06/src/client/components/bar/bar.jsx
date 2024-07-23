import React from 'react';
import SearchBar from './searchBar';
import { UserConsumer } from '../context/userConsumer';
import UserBar from './user';

const Bar = () => {
    return (
        <div className="topbar">
            <div className="inner">
                <SearchBar />
                <UserConsumer>{(user) => <UserBar user={user} />}</UserConsumer>
            </div>
        </div>
    );
};

export default Bar;
