
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const path = require('path');



const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
})


let bs = null
if (process.env.TYPE === "browsersync") {
    bs = new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
    })
}

let uglify = null;
if (process.env.NODE_ENV === "prod") {
    uglify = new UglifyJsPlugin();
}

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    // target: "node",
    module: {
        rules: [
            {
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
        },
        { 
            test: /\.(html)$/,
            use: { loader: 'html-loader', options: { attrs: [':data-src'] } } 
        },
        { 
            test: /\.html$|njk|nunjucks/,
            use: ['html-loader',
            { loader: 'nunjucks-html-loader', options : { 
                // Other super important. This will be the base
                // directory in which webpack is going to find
                // the layout and any other file index.njk is calling.
                minimize: false,
                minifyJS:true,
                minifyCSS:true,
                collapseWhitespace: false,
                searchPaths: ['./src/templates'],
                root: path.resolve(__dirname, 'production')
            } }] 
        }

    ]
    },
    plugins: [
        extractSass,
        new CopyWebpackPlugin([
            { from: 'src/static' }
        ]),
        new HtmlWebpackPlugin({
            template: 'nunjucks-html-loader!./src/index.njk',
        }),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'about.html',
            template: 'nunjucks-html-loader!./src/about.njk',
        }),
        bs,
        uglify
    ].filter(Boolean)
};