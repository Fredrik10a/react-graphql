import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import jwt from 'jsonwebtoken';
import { LOGIN } from '../login/mutations';

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const [login, { loading, error }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            if (data && data.login) {
                setIsAuthenticated(true);
                setUser(data.login.user);
            } else {
                console.error('Login data is null');
            }
        },
    });

    // Check for token in cookies and verify it
    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];
        if (token) {
            try {
                const decodedUser = jwt.decode(token);
                setIsAuthenticated(true);
                setUser(decodedUser);
            } catch (error) {
                console.error('Token verification failed:', error);
                handleLogout();
            }
        }
    }, []);

    const handleLogin = async ({ email, password }) => {
        try {
            await login({ variables: { email, password } });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    if (error) {
        console.error('GraphQL error:', error);
    }

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/';
        setIsAuthenticated(false);
        setUser(null);
        window.location.reload(); // Reload the page after logout
    };

    return <Provider value={{ isAuthenticated, user, handleLogin, handleLogout, loading, error }}>{children}</Provider>;
};

export { UserProvider, UserContext };
export const useUser = () => useContext(UserContext);
