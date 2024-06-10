import React from 'react';
import { useQuery } from '@apollo/client';
import Loading from '@client/components/loader';
import Error from '@client/components/error';
import Dropdown from '@client/components/dropdown';
import InfiniteScroll from 'react-infinite-scroller';

import DeletePostMutation from './deletePostMutation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { GET_POSTS } from './queries';

const FeedList = ({ changeState }) => {
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: { page: 0, limit: 10 },
    });

    if (loading) return <Loading />;
    if (error)
        return (
            <Error>
                <p>{error.message}</p>
            </Error>
        );

    const posts = data?.postsFeed?.posts || [];
    return (
        <div className="feed">
            <InfiniteScroll>
                {posts.map((post) => (
                    <div key={post.id} className={`post ${post.id < 0 ? 'optimistic' : ''}`}>
                        <div className="header">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}${post.user.avatar}`} alt={`${post.user.username}"s avatar`} />
                            <h2>{post.user.username}</h2>
                            <Dropdown trigger={<FontAwesomeIcon icon="angle-down" />}>
                                <button onClick={changeState}>Edit</button>
                                <DeletePostMutation postId={post.id}>
                                    <button>Delete</button>
                                </DeletePostMutation>
                            </Dropdown>
                        </div>
                        <p className="content">{post.text}</p>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default FeedList;
