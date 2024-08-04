import mongoose from 'mongoose';
import configFile from './config/index.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

// Connect to MongoDB
mongoose
    .connect(config.mongoURI)
    .then(() => console.log('MongoDB connection has been established successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));
