const baseTypeDefs = require('./typeDefs/Base');
const userTypeDefs = require('./typeDefs/User');
const postTypeDefs = require('./typeDefs/Post');
const chatTypeDefs = require('./typeDefs/Chat');

const typeDefs = [baseTypeDefs, userTypeDefs, postTypeDefs, chatTypeDefs];

module.exports = typeDefs;
