import React from 'react';
import { Helmet } from 'react-helmet';
import Feed from './feed/Feed';
import Chats from './chat/Chats';
import '../assets/style.css';

const App = () => (
    <div className="container">
        <Helmet>
            <title>Graphbook - Feed</title>
            <meta name="description" content="Newsfeed of all your friends on Graphbook" />
        </Helmet>
        <Feed />
        <Chats />
    </div>
);

export default App;
