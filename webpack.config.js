
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
})


let bs = null
if (process.env.TYPE === "browsersync"){
 bs = new BrowserSyncPlugin({
    // browse to http://localhost:3000/ during development,
    // ./public directory is being served
    host: 'localhost',
    port: 3000,
    server: { baseDir: ['dist'] }
  })
}

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass,
        new CopyWebpackPlugin([
            { from: 'src/static' }
        ]),
        new HtmlWebpackPlugin({
            template : __dirname + '/src/template.html'
        }),
        bs
    ].filter(Boolean)
};