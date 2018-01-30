
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './index.js',
    output: {
        filename: '[name].bundle.js',
        path: __dirname,
        publicPath: __dirname
    },
    devtool: 'source-map',
    watch: true,
    plugins: [
        // new UglifyJsPlugin()
    ]
};