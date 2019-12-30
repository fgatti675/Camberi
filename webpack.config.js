
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const path = require('path');

const debug = process.env.NODE_ENV === "development";

const extractSass = new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

let bs = null;
if (process.env.TYPE === "browsersync") {
    bs = new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
    })
}

let prodPlugins = [];
if (process.env.NODE_ENV === "prod") {
    prodPlugins = [
        new UglifyJsPlugin(),
        //new StyleExtHtmlWebpackPlugin()
    ];
}

module.exports = {
    entry: {
        'main': __dirname + '/src/index.js',
        'shape': __dirname + '/src/shape.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(html)$/,
                use: { loader: 'html-loader', options: { attrs: [':data-src'] } }
            },
            {
                test: /\.html$|njk|nunjucks/,
                use: ['html-loader',
                    {
                        loader: 'nunjucks-html-loader', options: {
                            // Other super important. This will be the base
                            // directory in which webpack is going to find
                            // the layout and any other file index.njk is calling.
                            minimize: false,
                            minifyJS: true,
                            minifyCSS: true,
                            collapseWhitespace: false,
                            searchPaths: ['./src/templates'],
                            root: path.resolve(__dirname, 'production')
                        }
                    }]
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            disable: process.env.NODE_ENV === "development"
        }),
        new CopyWebpackPlugin([
            { from: 'src/static' }
        ]),
        new HtmlWebpackPlugin({
            template: 'nunjucks-html-loader!./src/index.njk',
            minify: debug ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
              }
        }),
        new HtmlWebpackPlugin({
            template: 'nunjucks-html-loader!./src/index.njk',
            filename: 'es/index.html',
            minify: debug ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
              }
        }),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'about.html',
            template: 'nunjucks-html-loader!./src/about.njk',
            minify: debug ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
              }
        }),
        bs,
        ...prodPlugins
    ].filter(Boolean)
};