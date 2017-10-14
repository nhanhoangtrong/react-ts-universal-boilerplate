const webpack = require('webpack');
const dotenv = require('dotenv');
const { join, resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

module.exports = (env = {}) => {
    const isDev = env || process.env.NODE_ENV === 'development';
    const buildPath = resolve(__dirname, '../dist');
    const publicPath = env.publicPath || process.env.PUBLIC_PATH;
    return {
        name: 'server',
        target: 'node',
        context: resolve(__dirname, '../src'),
        devtool: 'source-map',
        entry: {
            server: './index.server.ts',
        },
        resolve: {
            modules: ['node_modules'],
            extensions: [
                '.ts', '.tsx',
                '.js', '.jsx',
                '.json',
            ],
        },
        externals: [nodeExternals({
            // Load non-javascript files with extensions, presumably via loaders
            whitelist: [/\.(?!(?:jsx?|tsx?|json)$).{1,5}$/i],
        })],
        output: {
            path: join(buildPath, publicPath),
            filename: '../[name].js',
            publicPath,
            chunkFilename: '[name].[chunkhash:8].chunk.js',
            libraryTarget: 'commonjs2',
        },
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'awesome-typescript-loader',
                        options: {
                            module: 'es6',
                        },
                    }],
                },
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true,
                        },
                    }],
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    use: ['source-map-loader'],
                },
                {
                    test: /\.styl$/,
                    use: [
                        'isomorphic-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]_[name]',
                                minimize: !isDev,
                            },
                        },
                        'stylus-loader',
                    ],
                },
                {
                    test: /\.(jpe?g|png|svg|gif|eot|ttf|woff|woff2)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            emitFile: false,
                        },
                    }],
                },
            ],
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
                __DEV__: isDev,
            }),
            new CopyPlugin([
                {
                    from: 'views',
                    to: '../views',
                },
            ]),
        ],
    };
};
