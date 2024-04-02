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
import combineResolvers from './services/resolvers.js';

const resolvers = combineResolvers([postResolvers /*, otherResolvers */]);

// Initialize the Express app
const app = express();

// Apply Helmet middleware to secure your app by setting various HTTP headers
app.use(helmet());
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);
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
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000', // front end origin
            credentials: true, // Allows cookies to be sent with requests
        },
    });
    // Start the Express server
    app.listen({ port: 8000 }, () =>
        console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
    );
});
