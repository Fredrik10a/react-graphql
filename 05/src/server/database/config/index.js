const development = {
    mongoURI: 'mongodb://localhost:27017/graphbook_dev',
};

const production = {
    mongoURI: `mongodb+srv://${process.env.username}:${process.env.password}@${process.env.host}/${process.env.database}?retryWrites=true&w=majority`,
};

const config = {
    development,
    production,
};

export default config;
