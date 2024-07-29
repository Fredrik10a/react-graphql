import React, { createContext, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../login/mutations';

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const [login, { loading, error }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            setIsAuthenticated(true);
            setToken(data.login.token);
            setUser(data.login.user);
        },
    });

    const handleLogin = async ({ email, password }) => {
        try {
            await login({ variables: { email, password } });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        console.log('Logged out');
    };

    return <Provider value={{ isAuthenticated, user, token, handleLogin, handleLogout, loading, error }}>{children}</Provider>;
};

export { UserProvider, UserContext };
export const useUser = () => useContext(UserContext);
