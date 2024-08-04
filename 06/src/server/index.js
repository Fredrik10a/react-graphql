import path from 'path';
import { fileURLToPath } from 'url';
// import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { makeExecutableSchema } from '@graphql-tools/schema';

dotenv.config(); // Load environment variables from .env file

// Import database connection
import './database/index.js';

// Import GraphQL type definitions and resolvers
import typeDefs from './services/schema.js';
import { authDirectiveTypeDefs, authDirectiveTransformer } from './services/authDirective.js';
import postResolvers from './services/resolvers/post.js';
import chatResolvers from './services/resolvers/chat.js';
import userResolvers from './services/resolvers/user.js';
import messageResolvers from './services/resolvers/message.js';
import combineResolvers from './services/resolvers.js';

// Add logging to ensure resolvers are combined correctly
console.log('Combining resolvers...');
const resolvers = combineResolvers([postResolvers, chatResolvers, userResolvers, messageResolvers]);
console.log('Resolvers combined:', resolvers);

// Define the root path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '../../');

// Initialize the Express app
const app = express();

/*
// Apply rate limiter to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
*/

// Apply Helmet middleware to secure your app by setting various HTTP headers
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// Use cookie parser middleware
app.use(cookieParser());

// CORS configuration to allow multiple specific origins
const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com'];
app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // Allows cookies to be sent with requests
    })
);

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

// Create and transform schema
const schema = makeExecutableSchema({
    typeDefs: [authDirectiveTypeDefs, ...typeDefs],
    resolvers,
});

const schemaWithDirectives = authDirectiveTransformer(schema);

// Setup Apollo Server for GraphQL
console.log('Setting up Apollo Server...');
const server = new ApolloServer({
    schema: schemaWithDirectives,
    formatError: (error) => {
        console.log('GraphQL Error:', error);
        return error;
    },
    context: ({ req, res }) => {
        let token = req.cookies.token;
        const authHeader = req.headers.authorization || '';

        // Check if token is in the Authorization header
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.replace('Bearer ', '');
        }

        let user = null;
        if (token) {
            try {
                user = jwt.verify(token, process.env.JWT_SECRET);
                console.log('User authenticated:', user);
            } catch (e) {
                console.log('Token verification failed:', e); // Log the error
            }
        } else {
            console.log('No token found');
        }
        return { req, res, user };
    },
    debug: true, // Make sure debugging is enabled
});

server.start().then(() => {
    server.applyMiddleware({
        app,
        cors: false,
    });
    // Start the Express server
    const PORT = process.env.PORT || 8000;
    app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
    console.log('Apollo Server applied middleware');
});
