const path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const Visualizer = require('webpack-visualizer-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: 'development',
    context: resolve(__dirname, 'src'),
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './index.tsx',
        // the entry point of our app
    ],
    output: {
        filename: 'hotloader.js',
        // the output bundle
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
        // necessary for HMR to know where to load the hot update chunks
    },
    devtool: 'inline-source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            assets: path.resolve(__dirname, 'src/assets'),
            lib: path.resolve(__dirname, 'src/lib'),
            stylesheets: path.resolve(__dirname, 'src/stylesheets'),
            store: path.resolve(__dirname, 'src/store/'),
            utils: path.resolve(__dirname, 'src/utils'),
            view: path.resolve(__dirname, 'src/view'),
            components: path.resolve(__dirname, 'src/view/components'),
            containers: path.resolve(__dirname, 'src/view/containers'),
            routes: path.resolve(__dirname, 'src/view/routes'),
            templates: path.resolve(__dirname, 'src/view/templates'),
        },
    },
    devServer: {
        port: '8080',
        hot: true,
        quiet: false,
        contentBase: resolve(__dirname, 'src'),
        publicPath: '/',
        overlay: {
            warnings: true,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'false',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        },
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            workers: 2,
            tsconfig: '../tsconfig.json',
            tslint: '../tslint.json',
            checkSyntacticErrors: true,
            async: false,
        }),
        new Visualizer(),
        new HappyPack({
            id: 'ts',
            threads: 2,
            loaders: [
                {
                    path: 'babel-loader',
                },
                {
                    path: 'ts-loader',
                    query: {
                        happyPackMode: true,
                    },
                },
            ],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: resolve(__dirname, 'src/index.html') }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['happypack/loader?id=ts'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['> 1%', 'last 2 versions'],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            data: '@import "variables";',
                            includePaths: [path.join(__dirname, 'src/stylesheets')],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /.(ico|jpg|jpeg|png|woff(2)?|eot|ttf|otf|svg|gif)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
            {
                test: /\.locales\.js/,
                exclude: /node_modules/,
                loader: 'i18next-resource-store-loader',
            },
        ],
    },
};
