import { makeExecutableSchema } from '@graphql-tools/schema';
import { authDirectiveTransformer } from './authDirective.js';
import base from './typeDefs/base.js';
import user from './typeDefs/user.js';
import post from './typeDefs/post.js';
import chat from './typeDefs/chat.js';

const typeDefs = [base, user, post, chat];

export default typeDefs;
