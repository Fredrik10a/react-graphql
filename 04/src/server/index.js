import path from 'path';
import { fileURLToPath } from 'url';

// Define the root path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '../../');

import helmet from 'helmet';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import './database/index.js';

// Import GraphQL type definitions and resolvers
import typeDefs from './services/schema.js';
import postResolvers from './services/resolvers/post.js';
import chatResolvers from './services/resolvers/chat.js';
import userResolvers from './services/resolvers/user.js';
import messageResolvers from './services/resolvers/message.js';
import combineResolvers from './services/resolvers.js';

const resolvers = combineResolvers([postResolvers, chatResolvers, userResolvers, messageResolvers]);

// Initialize the Express app
const app = express();
// CORS configuration to allow multiple specific origins
const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com'];
app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // Allows cookies to be sent with requests
    })
);

// Apply Helmet middleware to secure your app by setting various HTTP headers
app.use(helmet());
// Example of customizing Helmet: Referrer Policy
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
// Serve static files
app.use('/', express.static(path.join(root, 'dist/client')));
app.use(
    '/uploads',
    (req, res, next) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        next();
    },
    express.static(path.join(root, 'uploads'))
);

// Setup Apollo Server for GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
        console.log(error);
        return error;
    },
    debug: true, // Make sure debugging is enabled
});
server.start().then(() => {
    server.applyMiddleware({
        app,
        cors: false,
    });
    // Start the Express server
    app.listen({ port: 8000 }, () => console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`));
});
