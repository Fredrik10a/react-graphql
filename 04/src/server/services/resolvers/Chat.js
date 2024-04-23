import { Chat } from '../../models/index.js';

const chatResolvers = {
    Query: {
        async chats() {
            try {
                const chats = await Chat.find()
                    .populate({
                        path: 'users',
                        select: 'username avatar',
                    })
                    .populate({
                        path: 'messages',
                        options: {
                            sort: { createdAt: -1 },
                            limit: 1,
                        },
                    })
                    .sort({ createdAt: -1 })
                    .exec();
                return chats;
            } catch (error) {
                console.error('Error fetching chats:', error);
                throw new Error('Failed to fetch chats');
            }
        },
        async chat(root, { id }) {
            try {
                let chat = await Chat.findById(id).populate('users').populate('messages').exec();
                chat._id = chat._id.toString();
                return chat;
            } catch (error) {
                console.error('Error fetching chats:', error);
                throw new Error('Failed to fetch chats');
            }
        },
    },
    Mutation: {
        async addChat(root, { chat }) {
            try {
                // Check if there is an existing chat with the same users
                const existingChat = await Chat.findOne({ users: { $all: [chat.users[0], chat.users[1]] } })
                    .populate('users')
                    .populate('messages')
                    .exec();

                // If the chat exists, return the existing chat
                if (existingChat) {
                    return existingChat;
                }

                // If no chat exists, create a new one
                const newChat = new Chat({
                    ...chat,
                });

                await newChat.save();
                const populated = await Chat.findById(newChat._id).populate('users').populate('messages').exec();

                return populated;
            } catch (error) {
                console.error('Error in mutation:', error);
                throw new Error('Failed to execute mutation');
            }
        },
    },
};

export default chatResolvers;
