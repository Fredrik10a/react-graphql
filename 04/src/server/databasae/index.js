import mongoose from 'mongoose';
import configFile from '../config/';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

// Connect to MongoDB
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection has been established successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));

const db = {
    models: require('../models')(mongoose),
    mongoose
};

export default db;