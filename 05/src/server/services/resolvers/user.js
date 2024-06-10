import { User } from '../../models/index.js';

const userResolvers = {
    Query: {
        async users() {
            try {
                const users = await User.find().sort({ username: 1 }).exec();
                return users;
            } catch (error) {
                console.error('Error fetching:', error);
                throw new Error('Failed to fetch');
            }
        },
        async userSearch(_, { page, limit, text }) {
            if (!text || text.length < 3) {
                return { users: [] };
            }

            let skip = 0;
            if (page && limit) {
                skip = page * limit;
            }

            try {
                const users = await User.find({ username: { $regex: text, $options: 'i' } })
                    .sort({ username: 1 })
                    .skip(skip)
                    .limit(limit)
                    .exec();
                return {
                    users,
                };
            } catch (error) {
                console.error('Error fetching posts feed:', error);
                throw new Error('Failed to fetch posts feed');
            }
        },
    },
};

export default userResolvers;
