import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import client from './apollo/index.js';
import '../assets/style.css';
import { UserProvider } from './components/context/UserProvider.jsx';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <UserProvider>
                <App />
            </UserProvider>
        </ApolloProvider>
    </React.StrictMode>
);
