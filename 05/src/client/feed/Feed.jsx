import React from 'react';
import PostForm from '@client/components/post/form';
import FeedList from '@client/components/post/feedlist';

const Feed = () => {
    return (
        <div className="container">
            <PostForm />
            <FeedList />
        </div>
    );
};

export default Feed;
