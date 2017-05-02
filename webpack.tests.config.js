/* new - START */
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig=new HTMLWebpackPlugin({
    template: __dirname + '/tests/index.html',
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency',
    inject: true
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var locals = {
    routes: [
        '/',
    ]
};
/* new - END */


//var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var host = 'localhost';
var port = 8081;


module.exports = {
  context: __dirname + '/tests',

  entry: {
    javascript: 'mocha-loader!./index.js',
    html: './index.html',
    css: [ __dirname + '/node_modules/mocha/mocha.css' ]
  },

  output: {
    filename: 'test.build.js',
    path: __dirname + '/unit-tests'
  },

  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:
            {
              presets:['react', 'es2015', 'es2016']
            }
        },
        { // html files
            test: /\.html$/,
            loader: 'file-loader?name=[name].[ext]',
        },
        { // css files
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
        },

    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
        inject: true,
        chunk: 'html'
    }),
    new ExtractTextPlugin({ // define where to save the file
        filename: 'moca.[name]',
    }),

  ],

  devServer: {
    host: host,
    port: port
  },

  devtool: 'source-map'
};
