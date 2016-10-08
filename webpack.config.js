/**
 * Copyright 2016 Christopher Haverman
 * All Rights Reserved
 **/

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: './src/client/index.js',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        path: `${__dirname}/public`,
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({template: 'src/client/index.html'})]
};