import { Post } from '../../models/index.js';

const postResolvers = {
    Query: {
        async Posts() {
            // Assuming a 'user' field in Post schema stores the ObjectId reference to a User document
            try {
                const posts = await Post.find()
                    .populate('user', 'username avatar')
                    .sort({ createdAt: -1 })
                    .exec();
                return posts;
            } catch (error) {
                console.error('Error fetching posts:', error);
                throw new Error('Failed to fetch posts');
            }
        },
        async postsFeed(root, { page, limit }) {
            let skip = 0;
            if (page && limit) {
                skip = page * limit;
            }

            try {
                const posts = await Post.find()
                    .populate('user', 'username avatar')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                return {
                    posts,
                };
            } catch (error) {
                console.error('Error fetching posts feed:', error);
                throw new Error('Failed to fetch posts feed');
            }
        },
    },
    Mutation: {
        async addPost(root, { post }) {
            try {
                const newPost = new Post({
                    ...post,
                    user: '65f21051f15bdcc363a49e40',
                });

                await newPost.save();

                const populatedPost = await Post.findById(newPost._id)
                    .populate('user', 'username avatar')
                    .exec();

                return populatedPost;
            } catch (error) {
                console.error('Error in mutation:', error);
                throw new Error('Failed to execute mutation');
            }
        },
    },
};

export default postResolvers;
