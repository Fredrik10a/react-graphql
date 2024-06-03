import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { GET_POSTS, ADD_POST } from './queries';

const PostForm = () => {
    const [postContent, setPostContent] = useState('');

    const [addPost] = useMutation(ADD_POST, {
        update: (store, { data: { addPost } }) => {
            const variables = { page: 0, limit: 10 };
            const originalData = store.readQuery({ query: GET_POSTS, variables });
            const data = JSON.parse(JSON.stringify(originalData)); // Deep copy
            data.postsFeed.posts.unshift(addPost);
            store.writeQuery({ query: GET_POSTS, variables, data });
        },
        optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
                __typename: 'Post',
                text: postContent,
                id: -1, // Temporary ID
                user: {
                    __typename: 'User',
                    username: 'Loading...',
                    avatar: '/public/loading.gif',
                },
            },
        },
    });

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (postContent !== '') {
            await addPost({ variables: { post: { text: postContent } } });
        }
        setPostContent('');
    };

    return (
        <div className="postForm">
            <form onSubmit={handleSubmit}>
                <textarea value={postContent} onChange={handlePostContentChange} placeholder="Write your custom post!" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default PostForm;
