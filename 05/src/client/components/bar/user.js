import React from 'react';

const UserBar = ({ user }) => {
    if (!user) {
        return null;
    }

    return (
        <div className="user">
            <img src={user.avatar} alt="Avatar" />
            <span>{user.name}</span>
        </div>
    );
};

export default UserBar;
