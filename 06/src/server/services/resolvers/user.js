import { User } from '../../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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
        async myUser(_, __, { user }) {
            if (!user) throw new Error('You are not authenticated!');
            return await User.findById(user.id);
        },
    },
    Mutation: {
        async register(_, { username, email, password }) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email is already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });

            try {
                await user.save();
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return token;
            } catch (error) {
                console.error('Error during registration:', error);
                throw new Error('Failed to register user');
            }
        },
        async login(_, { email, password }, { res }) {
            console.log('Logging in:', email);
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('No user with that email');
            }
            /*
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Incorrect password');
            }
*/
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Set the cookie with HttpOnly and Secure flags
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 3600000, // 1 hour
                sameSite: 'strict', // CSRF protection
            });

            return { token, user };
        },
    },
};

export default userResolvers;
