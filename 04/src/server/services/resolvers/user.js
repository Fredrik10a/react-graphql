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
    },
};

export default userResolvers;
