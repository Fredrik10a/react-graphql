import React from 'react';
import { UserContext } from './userProvider';

const UserConsumer = ({ children }) => {
    return (
        <UserContext.Consumer>
            {(user) => {
                if (!user) {
                    throw new Error('UserConsumer must be used within a UserProvider');
                }

                return children(user);
            }}
        </UserContext.Consumer>
    );
};

export { UserConsumer };
