import React, { createContext } from 'react';

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
    const fakeUser = {
        name: 'John Doe',
        avatar: `${process.env.REACT_APP_BACKEND_URL}/uploads/avatar1.png`,
    };

    return <Provider value={fakeUser}>{children}</Provider>;
};

export { UserProvider, UserContext };
