var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const hostname = 'localhost';
const port = '8081';

module.exports = {
    entry: {
      javascript: './tests/index.js',
      html: './tests/index.html',
      css: [ __dirname + '/node_modules/mocha/mocha.css' ]
    },
    output: {
        filename: 'test.build.js',
        path: __dirname + '/unit-tests',
        publicPath: 'http://' + hostname + ':' + port + '/tests'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
            {
                test: /(\.html|\.css)$/,
                loader: 'file-loader?name=[name].[ext]',
                exclude: [
                    /build/
                ]
            },
            {
                test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
                loader: 'null-loader'
            }
        ]
    },
    devServer: {
        host: hostname,
        port: port
    }
};
