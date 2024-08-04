import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';

// Handling .env and .env.local
const env = dotenv.config().parsed || {}; // Load default .env file
const envLocal = dotenv.config({ path: '.env.local' }).parsed || {}; // Override with .env.local if available

// Merge environment variables, giving precedence to .env.local
const envVars = { ...env, ...envLocal };

// Prepare environment variables for DefinePlugin
const envKeys = Object.keys(envVars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
    return prev;
}, {});

const buildDirectory = 'dist';
const outputDirectory = `${buildDirectory}/client`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        path: path.join(process.cwd(), outputDirectory),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.mjs'],
        alias: {
            '@client': path.resolve(__dirname, 'src/client/'),
        },
        fallback: {
            buffer: 'buffer/',
            crypto: 'crypto-browserify',
            stream: 'stream-browserify',
            process: 'process/browser',
            vm: 'vm-browserify',
        },
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
        historyApiFallback: true, // Ensure single-page application routing works
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), buildDirectory)],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DefinePlugin(envKeys), // Use DefinePlugin with the prepared environment variables
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        }),
    ],
};
