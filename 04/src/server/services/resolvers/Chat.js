const { Chat } = require('../../models');

const chatResolvers = {
    Query: {
        async Chats() {
            try {
                const chats = await Chat.find()
                    .populate({
                        path: 'users',
                        select: 'username avatar',
                    })
                    .populate('messages')
                    .populate('lastMessage')
                    .sort({ createdAt: -1 })
                    .exec();
                return chats;
            } catch (error) {
                console.error('Error fetching chats:', error);
                throw new Error('Failed to fetch chats');
            }
        },
    },
};

module.exports = chatResolvers;
