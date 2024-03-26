const { ApolloServer } = require('apollo-server-express');
const express = require('express');

require('./database');

const typeDefs = require('./services/schema');
const postResolvers = require('./services/resolvers/post');

const combineResolvers = require('./services/resolvers');

const resolvers = combineResolvers([postResolvers /*, otherResolvers */]);

// Server Start
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen({ port: 8000 }, () =>
        console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
    );
});
