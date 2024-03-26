const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const buildDirectory = 'dist';
const outputDirectory = buildDirectory + '/client';
module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.mjs'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
        ],
    },
    devServer: {
        port: 3000,
        open: true,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
