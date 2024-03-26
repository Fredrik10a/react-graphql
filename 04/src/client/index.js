import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './apollo';
import '../assets/style.css';

const container = document.getElementById('root');
// Ensure you have a div with id='root' in your index.html
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
