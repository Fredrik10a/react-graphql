import React from 'react';
import PostForm from '@client/components/post/form';
import FeedList from '@client/components/post/feedlist';

const Feed = () => {
    const changeState = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <PostForm />
            <FeedList changeState={changeState} />
        </>
    );
};

export default Feed;
