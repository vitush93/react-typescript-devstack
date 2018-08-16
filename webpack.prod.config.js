const path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
    mode: 'production',
    context: resolve(__dirname, 'src'),
    entry: './index.tsx',
    output: {
        filename: 'bundle.[contenthash].js',
        path: resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    resolve: {
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
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
    plugins: [
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
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({ template: resolve(__dirname, 'src/index.html') }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new OptimizeCSSAssetsPlugin({}),
    ],
};
