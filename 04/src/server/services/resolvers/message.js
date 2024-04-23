import { Message, Chat } from '../../models/index.js';

const messageResolvers = {
    Mutation: {
        async addMessage(root, { message }) {
            try {
                const newMessage = new Message({
                    ...message,
                });

                await newMessage.save();

                // Fetch the chat document to which this message belongs
                const chat = await Chat.findById(message.chat);
                if (!chat) {
                    throw new Error('Chat not found');
                }

                // Add the new message's ID to the chat's messages array
                chat.messages.push(newMessage._id);
                await chat.save(); // Save the updated chat document

                const populatedMessage = await Message.findById(newMessage._id).populate('user').populate('chat').exec();

                return populatedMessage;
            } catch (error) {
                console.error('Error in mutation:', error);
                throw new Error('Failed to execute mutation');
            }
        },
    },
};

export default messageResolvers;
