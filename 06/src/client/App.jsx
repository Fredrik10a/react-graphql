// src/App.js
import React from 'react';
import { Helmet } from 'react-helmet';
import Feed from './features/feed/Feed';
import Chats from './features/chat/chat';
import './components/fontAwsome';
import '../assets/style.css';
import Bar from './components/bar/bar';
import LoginForm from './components/login/LoginForm';
import { useUser } from './components/context/UserProvider';

const App = () => {
    const { isAuthenticated } = useUser();

    return (
        <>
            {isAuthenticated ? (
                <>
                    <Helmet>
                        <title>Graphbook - Feed</title>
                        <meta name="description" content="News feed of all your friends on Graphbook" />
                    </Helmet>
                    <Bar />
                    <div className="container">
                        <div className="column center-column">
                            <Feed />
                        </div>
                        <div className="column right-column">
                            <Chats />
                        </div>
                    </div>
                </>
            ) : (
                <LoginForm />
            )}
        </>
    );
};

export default App;
