import React from 'react';
import { Helmet } from 'react-helmet';
import Feed from './features/feed/Feed';
import Chats from './features/chat/chat';
import './components/fontAwsome';
import '../assets/style.css';
import Bar from './components/bar/bar';
import { UserProvider } from './components/context/userProvider';

const App = () => (
    <>
        <Helmet>
            <title>Graphbook - Feed</title>
            <meta name="description" content="News feed of all your friends on Graphbook" />
        </Helmet>
        <UserProvider>
            <Bar />
            <div className="container">
                <div className="column center-column">
                    <Feed />
                </div>
                <div className="column right-column">
                    <Chats />
                </div>
            </div>
        </UserProvider>
    </>
);

export default App;
