/**
 * Created by Chris on 9/15/16.
 **/
module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry: './local/index',
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        path: `${__dirname}/pack`,
        filename: 'bundle.js'
    }
};