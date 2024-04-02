import { Chat } from '../../models';

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
    Mutation: {
        async addChat(root, { chat }) {
            try {
                const newChat = new Chat({
                    ...chat,
                });

                await newChat.save();

                const populated = await Chat.findById(newChat._id).exec();

                return populated;
            } catch (error) {
                console.error('Error in mutation:', error);
                throw new Error('Failed to execute mutation');
            }
        },
    },
};

export default chatResolvers;
