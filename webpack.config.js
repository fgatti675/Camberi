// const webpack = require('webpack');

module.exports = {

    entry: './index.js',

    output: {
        filename: '[name].bundle.js',
        path: __dirname,
        publicPath: __dirname
    },

    watch: true,

    devServer: {
        contentBase: __dirname,
        compress: true,
        inline: true
    },

    plugins: [
        // new webpack.NamedModulesPlugin()
    ]

};