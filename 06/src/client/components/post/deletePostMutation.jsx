import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST, GET_POSTS } from './queries';

const DeletePostMutation = ({ postId, children }) => {
    const [deletePost] = useMutation(DELETE_POST, {
        update: (store, { data: deletePost }) => {
            if (deletePost) {
                const variables = { page: 0, limit: 10 };
                const originalData = store.readQuery({ query: GET_POSTS, variables });
                const data = JSON.parse(JSON.stringify(originalData)); // Deep copy
                data.postsFeed.posts = data.postsFeed.posts.filter((post) => post.id !== postId);
                store.writeQuery({ query: GET_POSTS, variables, data });
            }
        },
    });

    const handleDelete = async () => {
        try {
            await deletePost({ variables: { postId } });
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // Clone the child element and attach the onClick handler
    return React.cloneElement(children, { onClick: handleDelete });
};

export default DeletePostMutation;
